import { Component } from '@angular/core';
import { PROFILE } from '../../core/profile';

@Component({
  selector: 'app-social-links',
  template: `
    <a class="social" [href]="profile.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <img src="img/skills/github_icon.png" alt="" />
    </a>
    <a class="social" [href]="profile.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <img src="img/skills/linkedin_icon.png" alt="" />
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
      transition: opacity 0.2s, transform 0.2s;

      &:hover {
        opacity: 0.8;
        transform: translateY(-2px);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `,
})
export class SocialLinks {
  protected readonly profile = PROFILE;
}
