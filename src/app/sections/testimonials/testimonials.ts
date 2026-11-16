import { Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/language.service';

const SLOT_OFFSETS = [-2, -1, 0, 1, 2];

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
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

  /** Slides to the next testimonial. */
  protected next(): void {
    this.position.update((p) => p + 1);
  }

  /** Slides to the previous testimonial. */
  protected previous(): void {
    this.position.update((p) => p - 1);
  }

  /** Moves the shortest way round to the given testimonial (used by the dots). */
  protected goTo(index: number): void {
    const count = this.items().length;
    let delta = index - this.activeIndex();
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    this.position.update((p) => p + delta);
  }

  /** Brings a clicked side card to the center. */
  protected onSlotClick(offset: number): void {
    this.position.update((p) => p + offset);
  }

  /** Modulo that is never negative, so positions below 0 still map to a valid index. */
  private mod(value: number, count: number): number {
    return ((value % count) + count) % count;
  }
}
