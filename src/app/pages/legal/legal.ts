import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { LEGAL_TEXTS, LegalDocKey } from '../../core/legal-texts';
import { PROFILE } from '../../core/profile';

/** Renders the legal notice or the privacy policy – which one comes from the route data. */
@Component({
  selector: 'app-legal',
  imports: [RouterLink],
  templateUrl: './legal.html',
  styleUrl: './legal.scss',
})
export class Legal {
  protected readonly language = inject(LanguageService);

  readonly doc = input.required<LegalDocKey>();

  protected readonly content = computed(() => LEGAL_TEXTS[this.language.lang()][this.doc()]);

  constructor() {
    const title = inject(Title);
    effect(() => title.setTitle(`${this.content().title} – ${PROFILE.firstName} ${PROFILE.lastName}`));
  }
}
