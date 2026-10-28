import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PAGE_TITLE } from '../../core/profile';
import { About } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Hero } from '../../sections/hero/hero';
import { Projects } from '../../sections/projects/projects';
import { Skills } from '../../sections/skills/skills';
import { Testimonials } from '../../sections/testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Skills, Projects, Testimonials, Contact],
  template: `
    <app-hero />
    <app-about />
    <app-skills />
    <app-projects />
    <app-testimonials />
    <app-contact />
  `,
})
export class Home {
  constructor() {
    inject(Title).setTitle(PAGE_TITLE);
  }
}
