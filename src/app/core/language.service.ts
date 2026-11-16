import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from './translations';

const STORAGE_KEY = 'portfolio-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.loadStoredLang());
  readonly texts = computed(() => TRANSLATIONS[this.lang()]);

  /** Syncs the selected language to the `<html lang>` attribute and to localStorage. */
  constructor() {
    effect(() => {
      const lang = this.lang();
      this.document.documentElement.lang = lang;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
      }
    });
  }

  /** Switches the UI language. */
  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  /** Returns the language saved in localStorage, or English if none (or storage is unavailable). */
  private loadStoredLang(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'de') return stored;
    } catch {
    }
    return 'en';
  }
}
