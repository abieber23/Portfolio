import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Lang } from '../../core/translations';

@Component({
  selector: 'app-language-toggle',
  template: `
    <div class="toggle" role="group" [attr.aria-label]="language.texts().nav.switchLanguage">
      @for (option of options; track option) {
        <button
          type="button"
          class="toggle__option"
          [class.toggle__option--active]="language.lang() === option"
          [attr.aria-pressed]="language.lang() === option"
          (click)="language.setLang(option)"
        >
          {{ option.toUpperCase() }}
        </button>
      }
    </div>
  `,
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  protected readonly language = inject(LanguageService);
  protected readonly options: Lang[] = ['en', 'de'];
}
