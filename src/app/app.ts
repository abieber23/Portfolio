import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { About } from './sections/about/about';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Skills } from './sections/skills/skills';
import { Testimonials } from './sections/testimonials/testimonials';

@Component({
  imports: [RouterOutlet, Header, Hero, About, Skills, Projects, Testimonials],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
