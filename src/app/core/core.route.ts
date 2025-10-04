import { Routes } from '@angular/router';

export const coreRoutes: Routes = [
  {
    path: 'type',
    loadComponent: () => import('../modules/type-writer/components/type-writer/type-writer').then((p) => p.TypeWriter),
  },
  {
    path: 'join',
    loadComponent: () => import('../modules/typing-room/components/typing-room/typing-room').then((p) => p.TypingRoom),
  },
];
