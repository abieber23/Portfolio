import { Translations } from '../../core/translations';

export interface Project {
  /** Key of the description in `projects.descriptions` of the translations. */
  key: keyof Translations['projects']['descriptions'];
  name: string;
  techs: string[];
  github: string;
  live: string;
  /** Path below public/, e.g. 'img/projects/join.png'. Placeholder is shown while missing. */
  image?: string;
}

/** Icon per tech (below public/img/skills/), used as a mask so it takes the accent color. */
export const TECH_ICONS: Record<string, string | undefined> = {
  Angular: 'img/skills/angular.png',
  TypeScript: 'img/skills/typescript.png',
  JavaScript: 'img/skills/javascript.png',
  HTML: 'img/skills/html.png',
  CSS: 'img/skills/css.png',
  // TODO: add img/skills/firebase.png
  Firebase: undefined,
};
