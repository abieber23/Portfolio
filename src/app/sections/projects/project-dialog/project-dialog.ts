import { Component, ElementRef, computed, effect, inject, input, output, viewChild } from '@angular/core';
import { LanguageService } from '../../../core/language.service';
import { Project, TECH_ICONS } from '../project';

/** Native <dialog> (focus trap, Esc, backdrop) showing the details of one project. */
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.scss',
})
export class ProjectDialog {
  protected readonly language = inject(LanguageService);
  protected readonly techIcons = TECH_ICONS;

  /** Open while a project is set. */
  readonly project = input<Project | null>(null);
  readonly number = input(1);

  /** List of zero or one project, rendered with @for so each project gets a fresh card. */
  protected readonly shown = computed(() => {
    const project = this.project();
    return project ? [project] : [];
  });

  readonly closed = output<void>();
  readonly next = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const dialog = this.dialog().nativeElement;
      if (this.project() && !dialog.open) dialog.showModal();
      if (!this.project() && dialog.open) dialog.close();
    });
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** The card fills the whole dialog, so a click on the dialog element itself hit the backdrop. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }
}
