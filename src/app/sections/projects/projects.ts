import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/language.service';

interface Project {
  name: string;
  techs: string[];
  /** Path below public/, e.g. 'img/projects/join.png'. Placeholder is shown while missing. */
  image?: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly language = inject(LanguageService);

  protected readonly projects: Project[] = [
    { name: 'Join', techs: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'] },
    { name: 'El Pollo Loco', techs: ['HTML', 'CSS', 'JavaScript'] },
    { name: 'DA Bubble', techs: ['Angular', 'Firebase', 'TypeScript'] },
  ];

  protected readonly activeIndex = signal<number | null>(null);
  protected readonly activeProject = computed(() => {
    const index = this.activeIndex();
    return index === null ? null : this.projects[index];
  });
  /** Vertical offset (px) that centers the preview next to the active row. */
  protected readonly previewOffset = signal(0);

  private readonly preview = viewChild.required<ElementRef<HTMLElement>>('preview');

  protected activate(index: number, row: HTMLElement): void {
    const rowCenter = row.offsetTop + row.offsetHeight / 2;
    this.previewOffset.set(rowCenter - this.preview().nativeElement.offsetHeight / 2);
    this.activeIndex.set(index);
  }
}
