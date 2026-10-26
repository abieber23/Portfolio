import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';
import { SocialLinks } from '../../shared/social-links/social-links';

/** Auto-scroll speed of the marquee in px per ms. */
const AUTO_SPEED = 0.16;
/** Per-frame (16 ms) factor the release momentum decays by. */
const FRICTION = 0.95;
const MAX_VELOCITY = 3;

@Component({
  selector: 'app-hero',
  imports: [SocialLinks],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly language = inject(LanguageService);
  protected readonly profile = PROFILE;
  protected readonly dragging = signal(false);

  /** Items repeated so one marquee group is always wider than the viewport. */
  protected readonly marqueeItems = computed(() => {
    const items = this.language.texts().hero.marquee;
    return [...items, ...items];
  });

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private offset = 0;
  private velocity = 0;
  private hovering = false;
  private lastX = 0;
  private lastMoveTime = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let last = performance.now();
      let frame = 0;

      const tick = (now: number) => {
        const dt = now - last;
        last = now;

        if (!this.dragging()) {
          if (Math.abs(this.velocity) > 0.02) {
            this.offset += this.velocity * dt;
            this.velocity *= Math.pow(FRICTION, dt / 16);
          } else if (!this.hovering && !reduceMotion) {
            this.offset += AUTO_SPEED * dt;
          }
        }

        this.renderMarquee();
        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      destroyRef.onDestroy(() => cancelAnimationFrame(frame));
    });
  }

  protected onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'mouse') this.hovering = true;
  }

  protected onPointerLeave(): void {
    this.hovering = false;
  }

  protected onPointerDown(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.dragging.set(true);
    this.velocity = 0;
    this.lastX = event.clientX;
    this.lastMoveTime = event.timeStamp;
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) return;
    const dx = event.clientX - this.lastX;
    const dt = Math.max(event.timeStamp - this.lastMoveTime, 1);
    this.offset -= dx;
    this.velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, -dx / dt));
    this.lastX = event.clientX;
    this.lastMoveTime = event.timeStamp;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging()) return;
    this.dragging.set(false);
    // pointer held still before release – no fling
    if (event.timeStamp - this.lastMoveTime > 100) this.velocity = 0;
  }

  private renderMarquee(): void {
    const track = this.track().nativeElement;
    const groupWidth = track.offsetWidth / 2;
    if (groupWidth > 0) {
      this.offset = ((this.offset % groupWidth) + groupWidth) % groupWidth;
    }
    track.style.transform = `translateX(${-this.offset}px)`;
  }
}
