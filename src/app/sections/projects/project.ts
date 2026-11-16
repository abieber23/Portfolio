import { Translations } from '../../core/translations';

export interface Project {
  key: keyof Translations['projects']['descriptions'];
  name: string;
  techs: string[];
  github: string;
  live: string;
  image?: string;
}

export const TECH_ICONS: Record<string, string | undefined> = {
  Angular: 'img/skills/angular.png',
  TypeScript: 'img/skills/typescript.png',
  JavaScript: 'img/skills/javascript.png',
  HTML: 'img/skills/html.png',
  CSS: 'img/skills/css.png',
  // TODO: add img/skills/firebase.png
  Firebase: undefined,
};
