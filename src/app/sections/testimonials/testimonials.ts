import { Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/language.service';

/** Slots rendered around the active card; ±2 sit off-screen so wrap-around slides in smoothly. */
const SLOT_OFFSETS = [-2, -1, 0, 1, 2];

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  protected readonly language = inject(LanguageService);

  /**
   * Unbounded position: it only ever counts up/down, so every card keeps a stable
   * track key while moving and CSS can animate it from slot to slot.
   */
  private readonly position = signal(1);

  private readonly items = computed(() => this.language.texts().testimonials.items);
  protected readonly activeIndex = computed(() => this.mod(this.position(), this.items().length));

  protected readonly slots = computed(() =>
    SLOT_OFFSETS.map((offset) => {
      const key = this.position() + offset;
      return { key, offset, item: this.items()[this.mod(key, this.items().length)] };
    }),
  );

  protected next(): void {
    this.position.update((p) => p + 1);
  }

  protected previous(): void {
    this.position.update((p) => p - 1);
  }

  /** Moves the shortest way round to the given testimonial. */
  protected goTo(index: number): void {
    const count = this.items().length;
    let delta = index - this.activeIndex();
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    this.position.update((p) => p + delta);
  }

  protected onSlotClick(offset: number): void {
    this.position.update((p) => p + offset);
  }

  private mod(value: number, count: number): number {
    return ((value % count) + count) % count;
  }
}
