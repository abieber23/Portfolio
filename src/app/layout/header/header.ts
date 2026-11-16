import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';
import { LanguageToggle } from '../../shared/language-toggle/language-toggle';
import { Logo } from '../../shared/logo/logo';
import { SocialLinks } from '../../shared/social-links/social-links';

/** Sections that have a nav link, in page order. */
const NAV_SECTIONS = ['about', 'skills', 'projects'] as const;
type NavSection = (typeof NAV_SECTIONS)[number];

@Component({
  selector: 'app-header',
  imports: [RouterLink, LanguageToggle, Logo, SocialLinks],
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

  /** The nav section that currently crosses the upper third of the viewport (null elsewhere / on other pages). */
  protected readonly activeSection = signal<NavSection | null>(null);

  /** Tracks the active section on scroll/resize (once per animation frame). */
  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let frame = 0;
      const update = () => {
        frame = 0;
        const line = innerHeight / 3;
        const active = NAV_SECTIONS.find((id) => {
          const rect = document.getElementById(id)?.getBoundingClientRect();
          return rect && rect.top <= line && rect.bottom > line;
        });
        this.activeSection.set(active ?? null);
      };
      const schedule = () => (frame ||= requestAnimationFrame(update));

      addEventListener('scroll', schedule, { passive: true });
      addEventListener('resize', schedule);
      update();
      destroyRef.onDestroy(() => {
        removeEventListener('scroll', schedule);
        removeEventListener('resize', schedule);
        cancelAnimationFrame(frame);
      });
    });
  }

  /** Opens or closes the mobile menu. */
  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** Closes the mobile menu (e.g. on Esc or after clicking a link). */
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Closes the mobile menu when the click lands outside of any link or button. */
  protected onMenuClick(event: MouseEvent): void {
    const target = event.target as Element;
    if (!target.closest('a, button')) this.closeMenu();
  }
}
