import { Component, ElementRef, computed, effect, inject, input, output, viewChild } from '@angular/core';
import { LanguageService } from '../../../core/language.service';
import { Project, TECH_ICONS } from '../project';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.html',
  styleUrl: './project-dialog.scss',
})
export class ProjectDialog {
  protected readonly language = inject(LanguageService);
  protected readonly techIcons = TECH_ICONS;

  readonly project = input<Project | null>(null);
  readonly number = input(1);
  /** All projects; their texts are stacked invisibly so the card keeps the same height for each project. */
  readonly projects = input<Project[]>([]);

  protected readonly shown = computed(() => {
    const project = this.project();
    return project ? [project] : [];
  });

  readonly closed = output<void>();
  readonly next = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  /** Opens the native dialog as a modal while a project is set and closes it otherwise. */
  constructor() {
    effect(() => {
      const dialog = this.dialog().nativeElement;
      if (this.project() && !dialog.open) dialog.showModal();
      if (!this.project() && dialog.open) dialog.close();
    });
  }

  /** Closes the dialog; its close event then notifies the parent. */
  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** Closes the dialog on a backdrop click (a click that hits the dialog element itself). */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }
}
