import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.route').then((p) => p.coreRoutes),
  },
];
