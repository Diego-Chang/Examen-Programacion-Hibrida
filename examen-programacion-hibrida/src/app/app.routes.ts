import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'publication-manager',
    loadComponent: () => import('./pages/publication-manager/publication-manager.page').then((m) => m.PublicationManagerPage),
  },
];
