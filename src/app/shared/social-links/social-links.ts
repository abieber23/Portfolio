import { Component } from '@angular/core';
import { PROFILE } from '../../core/profile';

@Component({
  selector: 'app-social-links',
  template: `
    <a class="social" [href]="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
        />
      </svg>
    </a>
    <a class="social" [href]="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.45 1H3.55A2.55 2.55 0 0 0 1 3.55v16.9A2.55 2.55 0 0 0 3.55 23h16.9A2.55 2.55 0 0 0 23 20.45V3.55A2.55 2.55 0 0 0 20.45 1ZM7.6 19.4H4.6V9.3h3V19.4ZM6.1 7.95a1.74 1.74 0 1 1 0-3.48 1.74 1.74 0 0 1 0 3.48ZM19.4 19.4h-3v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6v4.98h-3V9.3h2.88v1.38h.04a3.16 3.16 0 0 1 2.84-1.56c3.04 0 3.6 2 3.6 4.6v5.68Z"
        />
      </svg>
    </a>
  `,
  styles: `
    :host {
      display: flex;
      gap: 16px;
    }

    .social {
      display: flex;
      width: 28px;
      height: 28px;
      color: var(--color-accent);
      transition: color 0.2s, transform 0.2s;

      &:hover {
        color: var(--color-text);
        transform: translateY(-2px);
      }
    }

    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `,
})
export class SocialLinks {
  protected readonly profile = PROFILE;
}
