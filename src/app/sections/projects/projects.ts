import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Project } from './project';
import { ProjectDialog } from './project-dialog/project-dialog';

@Component({
  selector: 'app-projects',
  imports: [ProjectDialog],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly language = inject(LanguageService);

  protected readonly projects: Project[] = [
    {
      key: 'join',
      name: 'Join',
      techs: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      github: 'https://github.com/mustafa927/JOINv2',
      live: 'https://join.adrian-bieber-portfolio.de/',
      image: 'img/projects/join.png',
    },
    {
      key: 'sharkie',
      name: 'Sharkie',
      techs: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/abieber23/Sharkie',
      live: 'https://sharkie.adrian-bieber-portfolio.de/',
      image: 'img/projects/sharkie.png',
    },
    {
      key: 'bubble',
      name: 'DA Bubble',
      techs: ['Angular', 'Firebase', 'TypeScript'],
      github: 'https://github.com/ChristopherBraun196/DA-Bubble',
      live: 'https://da-bubble.adrian-bieber-portfolio.de/',
      image: 'img/projects/da-bubble.png',
    },
  ];

  protected readonly activeIndex = signal<number | null>(null);
  protected readonly activeProject = computed(() => {
    const index = this.activeIndex();
    return index === null ? null : this.projects[index];
  });
  protected readonly previewOffset = signal(0);

  protected readonly openIndex = signal<number | null>(null);
  protected readonly openProject = computed(() => {
    const index = this.openIndex();
    return index === null ? null : this.projects[index];
  });

  private readonly preview = viewChild.required<ElementRef<HTMLElement>>('preview');

  /** Shows the hover preview for a project, vertically centered next to its row. */
  protected activate(index: number, row: HTMLElement): void {
    const rowCenter = row.offsetTop + row.offsetHeight / 2;
    this.previewOffset.set(rowCenter - this.preview().nativeElement.offsetHeight / 2);
    this.activeIndex.set(index);
  }

  /** Opens the detail dialog of a project. */
  protected open(index: number): void {
    this.openIndex.set(index);
  }

  /** Switches the dialog to the next project, starting over after the last one. */
  protected openNext(): void {
    this.openIndex.update((index) => ((index ?? 0) + 1) % this.projects.length);
  }
}
