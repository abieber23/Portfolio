import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';
import { SocialLinks } from '../../shared/social-links/social-links';

const AUTO_SPEED = 0.16;
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

  /** Starts the marquee animation loop after the first render (auto-scroll + release momentum). */
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

  /** Pauses the auto-scroll while a mouse hovers the marquee. */
  protected onPointerEnter(event: PointerEvent): void {
    if (event.pointerType === 'mouse') this.hovering = true;
  }

  /** Resumes the auto-scroll when the pointer leaves the marquee. */
  protected onPointerLeave(): void {
    this.hovering = false;
  }

  /** Starts dragging the marquee and captures the pointer. */
  protected onPointerDown(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.dragging.set(true);
    this.velocity = 0;
    this.lastX = event.clientX;
    this.lastMoveTime = event.timeStamp;
  }

  /** Moves the marquee with the pointer and tracks the velocity for the release fling. */
  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) return;
    const dx = event.clientX - this.lastX;
    const dt = Math.max(event.timeStamp - this.lastMoveTime, 1);
    this.offset -= dx;
    this.velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, -dx / dt));
    this.lastX = event.clientX;
    this.lastMoveTime = event.timeStamp;
  }

  /** Ends dragging; drops the momentum if the pointer was held still before release. */
  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging()) return;
    this.dragging.set(false);
    if (event.timeStamp - this.lastMoveTime > 100) this.velocity = 0;
  }

  /** Wraps the offset into one item group and applies it to the track, so the loop is seamless. */
  private renderMarquee(): void {
    const track = this.track().nativeElement;
    const groupWidth = track.offsetWidth / 2;
    if (groupWidth > 0) {
      this.offset = ((this.offset % groupWidth) + groupWidth) % groupWidth;
    }
    track.style.transform = `translateX(${-this.offset}px)`;
  }
}
