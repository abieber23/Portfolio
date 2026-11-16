import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Writes a scroll-based offset into the CSS variable `--parallax` (px) on the host:
 * 0 when the host is centered in the viewport, growing with the distance times `appParallax` (factor).
 * The host's styles decide what moves, e.g. `transform: translateY(var(--parallax, 0px))` on a decorative layer.
 * Does nothing when the visitor prefers reduced motion.
 */
@Directive({ selector: '[appParallax]' })
export class Parallax {
  readonly appParallax = input(0.15);

  /** Updates the offset on scroll/resize, at most once per animation frame. */
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let frame = 0;
      const update = () => {
        frame = 0;
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return;
        const distance = rect.top + rect.height / 2 - innerHeight / 2;
        element.style.setProperty('--parallax', `${(-distance * this.appParallax()).toFixed(1)}px`);
      };
      const schedule = () => (frame ||= requestAnimationFrame(update));

      addEventListener('scroll', schedule, { passive: true });
      addEventListener('resize', schedule);
      update();
      destroyRef.onDestroy(() => {
        removeEventListener('scroll', schedule);
        removeEventListener('resize', schedule);
        cancelAnimationFrame(frame);
      });
    });
  }
}
