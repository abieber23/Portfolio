import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Legal } from './pages/legal/legal';

export const routes: Routes = [
  { path: '', component: Home },
  // `doc` is bound to the Legal component's input (withComponentInputBinding)
  { path: 'legal-notice', component: Legal, data: { doc: 'legalNotice' } },
  { path: 'privacy-policy', component: Legal, data: { doc: 'privacyPolicy' } },
  { path: '**', redirectTo: '' },
];
