import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';

/** Direction/style of the entrance; the matching keyframes live in `styles.scss`. */
export type RevealVariant = 'up' | 'left' | 'right' | 'pop' | 'stagger';

/**
 * Plays an entrance animation once the host scrolls into view (once only).
 * Usage: `<div appReveal>`, `<div appReveal="left" [revealDelay]="200">`.
 * `stagger`: the host itself stays still and its `.reveal-item` children (index in `--i`) animate one after another.
 * Uses a CSS animation (not a transition), so the host's own transitions/transforms keep working afterwards.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal--left]': "appReveal() === 'left'",
    '[class.reveal--right]': "appReveal() === 'right'",
    '[class.reveal--pop]': "appReveal() === 'pop'",
    '[class.reveal--stagger]': "appReveal() === 'stagger'",
    '[class.reveal--visible]': 'visible()',
    '[style.--reveal-delay.ms]': 'revealDelay()',
  },
})
export class Reveal {
  readonly appReveal = input<RevealVariant | ''>('');
  readonly revealDelay = input(0);

  protected readonly visible = signal(false);

  /** Observes the host after the first render and marks it visible when ~15% of it is on screen. */
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.visible.set(true);
          observer.disconnect();
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
