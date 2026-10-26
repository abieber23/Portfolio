import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';
import { LanguageToggle } from '../../shared/language-toggle/language-toggle';
import { Logo } from '../../shared/logo/logo';
import { SocialLinks } from '../../shared/social-links/social-links';

@Component({
  selector: 'app-header',
  imports: [LanguageToggle, Logo, SocialLinks],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class Header {
  protected readonly language = inject(LanguageService);
  protected readonly profile = PROFILE;
  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
