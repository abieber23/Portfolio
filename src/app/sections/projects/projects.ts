import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../shared/reveal/reveal';
import { Project } from './project';
import { ProjectDialog } from './project-dialog/project-dialog';

@Component({
  selector: 'app-projects',
  imports: [ProjectDialog, Reveal],
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
      image: 'img/projects/sharkie.webp',
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
  /** The hovered project as a list, so a new project re-creates the image and plays its enter animation. */
  protected readonly previewItems = computed(() => {
    const project = this.activeProject();
    return project ? [project] : [];
  });
  protected readonly previewOffset = signal(0);
  /** Short tilt in the direction the preview moves (rows below → positive), reset after the move. */
  protected readonly previewTilt = signal(0);
  private tiltTimer?: ReturnType<typeof setTimeout>;

  protected readonly openIndex = signal<number | null>(null);
  protected readonly openProject = computed(() => {
    const index = this.openIndex();
    return index === null ? null : this.projects[index];
  });

  private readonly preview = viewChild.required<ElementRef<HTMLElement>>('preview');

  /** Shows the hover preview for a project, vertically centered next to its row; tilts it while it travels. */
  protected activate(index: number, row: HTMLElement): void {
    const rowCenter = row.offsetTop + row.offsetHeight / 2;
    const offset = rowCenter - this.preview().nativeElement.offsetHeight / 2;
    const previous = this.activeIndex();

    if (previous !== null && previous !== index) {
      this.previewTilt.set(Math.sign(offset - this.previewOffset()) * 4);
      clearTimeout(this.tiltTimer);
      this.tiltTimer = setTimeout(() => this.previewTilt.set(0), 250);
    }
    this.previewOffset.set(offset);
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
