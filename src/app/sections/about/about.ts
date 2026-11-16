import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Parallax } from '../../shared/parallax/parallax';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-about',
  imports: [Reveal, Parallax],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly language = inject(LanguageService);
}
