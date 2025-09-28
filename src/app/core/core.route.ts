import { Routes } from '@angular/router';

export const coreRoutes: Routes = [
  {
    path: 'type',
    loadComponent: () => import('../modules/type-writer/type-writer').then((p) => p.TypeWriter),
  },
];
