import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { LanguageService } from '../../core/language.service';

interface Skill {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'learningOpen.set(false)',
  },
})
export class Skills {
  protected readonly language = inject(LanguageService);
  protected readonly learningOpen = signal(false);

  protected readonly skills: Skill[] = [
    { name: 'HTML', icon: 'html.png' },
    { name: 'CSS', icon: 'css.png' },
    { name: 'JavaScript', icon: 'javascript.png' },
    { name: 'Material Design', icon: 'material-design.png' },
    { name: 'TypeScript', icon: 'typescript.png' },
    { name: 'Angular', icon: 'angular.png' },
    { name: 'Supabase', icon: 'supabase.png' },
    { name: 'Git', icon: 'git.png' },
    { name: 'REST-API', icon: 'rest-api.png' },
    { name: 'Scrum', icon: 'scrum.png' },
  ];

  private readonly growth = viewChild.required<ElementRef<HTMLElement>>('growth');

  protected toggleLearning(): void {
    this.learningOpen.update((open) => !open);
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.growth().nativeElement.contains(event.target as Node)) {
      this.learningOpen.set(false);
    }
  }
}
