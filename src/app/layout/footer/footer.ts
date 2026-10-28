import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../core/profile';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly language = inject(LanguageService);
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
