import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';
import { SocialLinks } from '../../shared/social-links/social-links';

const AUTO_SPEED = 0.16;
const FRICTION = 0.95;
const MAX_VELOCITY = 3;

/** Typewriter: pause before the first letter and time per letter (ms). */
const TYPE_START = 600;
const TYPE_STEP = 75;
/** How fast the mouse parallax follows the pointer (share of the remaining distance per frame). */
const PARALLAX_EASE = 0.06;

@Component({
  selector: 'app-hero',
  imports: [SocialLinks],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  host: {
    '(pointermove)': 'onHeroPointerMove($event)',
  },
})
export class Hero {
  protected readonly language = inject(LanguageService);
  protected readonly profile = PROFILE;
  protected readonly dragging = signal(false);

  protected readonly marqueeItems = computed(() => {
    const items = this.language.texts().hero.marquee;
    return [...items, ...items];
  });

  /** Number of typed letters of the role; Infinity once finished, so a language switch shows the full text. */
  private readonly typed = signal(0);
  protected readonly typedRole = computed(() => this.language.texts().hero.role.slice(0, this.typed()));
  protected readonly typingDone = computed(() => this.typed() === Infinity);

  private readonly hero = viewChild.required<ElementRef<HTMLElement>>('hero');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private offset = 0;
  private velocity = 0;
  private hovering = false;
  private lastX = 0;
  private lastMoveTime = 0;

  /** Pointer position over the hero, -1…1 from the center (target) and the eased value that is rendered. */
  private pointer = { x: 0, y: 0 };
  private eased = { x: 0, y: 0 };
  private lastScroll = -1;

  /** Starts the typewriter and the animation loop (marquee auto-scroll + momentum, mouse/scroll parallax). */
  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.startTypewriter(reduceMotion, destroyRef);

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
        if (!reduceMotion) this.renderParallax();
        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      destroyRef.onDestroy(() => cancelAnimationFrame(frame));
    });
  }

  /** Remembers the mouse position over the hero for the parallax (touch is ignored). */
  protected onHeroPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    this.pointer = {
      x: (event.clientX / innerWidth) * 2 - 1,
      y: (event.clientY / innerHeight) * 2 - 1,
    };
  }

  /** Types the role letter by letter; shows it at once when the visitor prefers reduced motion. */
  private startTypewriter(reduceMotion: boolean, destroyRef: DestroyRef): void {
    if (reduceMotion) {
      this.typed.set(Infinity);
      return;
    }
    const step = () => {
      const count = this.typed() + 1;
      const done = count >= this.language.texts().hero.role.length;
      this.typed.set(done ? Infinity : count);
      if (!done) timer = setTimeout(step, TYPE_STEP);
    };
    let timer = setTimeout(step, TYPE_START);
    destroyRef.onDestroy(() => clearTimeout(timer));
  }

  /** Eases toward the pointer and writes pointer + scroll offsets as CSS variables (only when they change). */
  private renderParallax(): void {
    const style = this.hero().nativeElement.style;
    const dx = this.pointer.x - this.eased.x;
    const dy = this.pointer.y - this.eased.y;
    if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
      this.eased.x += dx * PARALLAX_EASE;
      this.eased.y += dy * PARALLAX_EASE;
      style.setProperty('--mx', this.eased.x.toFixed(3));
      style.setProperty('--my', this.eased.y.toFixed(3));
    }

    const scroll = Math.min(scrollY, innerHeight);
    if (scroll !== this.lastScroll) {
      this.lastScroll = scroll;
      style.setProperty('--scroll', scroll.toFixed(0));
    }
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
