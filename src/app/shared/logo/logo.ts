import { Component } from '@angular/core';
import { PROFILE } from '../../core/profile';

@Component({
  selector: 'app-logo',
  template: `
    <img class="mark" src="logo.png" alt="" width="83" height="56" />
    <span class="name">
      <span>{{ profile.firstName }}</span>
      <span>{{ profile.lastName }}</span>
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .mark {
      width: auto;
      height: 46px;
    }

    .name {
      display: flex;
      flex-direction: column;
      font-family: var(--font-sans);
      font-size: 24px;
      font-weight: 800;
      line-height: 0.95;
      color: var(--color-text);
    }
  `,
})
export class Logo {
  protected readonly profile = PROFILE;
}
