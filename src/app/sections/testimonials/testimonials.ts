import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../shared/reveal/reveal';

const SLOT_OFFSETS = [-2, -1, 0, 1, 2];
/** Autoplay interval and the minimum horizontal distance (px) that counts as a swipe. */
const AUTOPLAY_MS = 6000;
const SWIPE_MIN = 50;

@Component({
  selector: 'app-testimonials',
  imports: [Reveal],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
  host: {
    '(mouseenter)': 'hovered = true',
    '(mouseleave)': 'hovered = false',
    '(focusin)': 'focused = true',
    '(focusout)': 'focused = false',
  },
})
export class Testimonials {
  protected readonly language = inject(LanguageService);

  private readonly position = signal(1);

  private readonly items = computed(() => this.language.texts().testimonials.items);
  protected readonly activeIndex = computed(() => this.mod(this.position(), this.items().length));

  protected readonly slots = computed(() =>
    SLOT_OFFSETS.map((offset) => {
      const key = this.position() + offset;
      return { key, offset, item: this.items()[this.mod(key, this.items().length)] };
    }),
  );

  /** Autoplay pauses while hovered, focused, off screen or in a background tab; every move restarts the timer. */
  protected hovered = false;
  protected focused = false;
  private inView = false;
  private lastMove = 0;

  private swipeStartX: number | null = null;
  private swiped = false;

  /** Starts the autoplay (unless reduced motion is preferred) and watches whether the section is on screen. */
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const observer = new IntersectionObserver(([entry]) => (this.inView = entry.isIntersecting), {
        threshold: 0.5,
      });
      observer.observe(element);

      this.lastMove = Date.now();
      const timer = setInterval(() => {
        const paused = this.hovered || this.focused || !this.inView || document.hidden;
        if (paused) this.lastMove = Date.now();
        else if (Date.now() - this.lastMove >= AUTOPLAY_MS) this.move(1);
      }, 250);

      destroyRef.onDestroy(() => {
        clearInterval(timer);
        observer.disconnect();
      });
    });
  }

  /** Slides to the next testimonial. */
  protected next(): void {
    this.move(1);
  }

  /** Slides to the previous testimonial. */
  protected previous(): void {
    this.move(-1);
  }

  /** Moves the shortest way round to the given testimonial (used by the dots). */
  protected goTo(index: number): void {
    const count = this.items().length;
    let delta = index - this.activeIndex();
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    this.move(delta);
  }

  /** Brings a clicked side card to the center (ignored right after a swipe). */
  protected onSlotClick(offset: number): void {
    if (this.swiped) return;
    this.move(offset);
  }

  /** Remembers where a touch/pen swipe starts. */
  protected onSwipeStart(event: PointerEvent): void {
    this.swiped = false;
    this.swipeStartX = event.pointerType === 'mouse' ? null : event.clientX;
  }

  /** Slides by one when the finger moved far enough sideways. */
  protected onSwipeEnd(event: PointerEvent): void {
    if (this.swipeStartX === null) return;
    const dx = event.clientX - this.swipeStartX;
    this.swipeStartX = null;
    if (Math.abs(dx) < SWIPE_MIN) return;
    this.swiped = true;
    this.move(dx < 0 ? 1 : -1);
  }

  /** Shifts the carousel and restarts the autoplay timer. */
  private move(delta: number): void {
    this.position.update((p) => p + delta);
    this.lastMove = Date.now();
  }

  /** Modulo that is never negative, so positions below 0 still map to a valid index. */
  private mod(value: number, count: number): number {
    return ((value % count) + count) % count;
  }
}
