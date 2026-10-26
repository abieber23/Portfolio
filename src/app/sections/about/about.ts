import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly language = inject(LanguageService);
  /** Icon per point, same order as `about.points` in the translations. */
  protected readonly pointIcons = ['location', 'learning', 'solving'] as const;
}
