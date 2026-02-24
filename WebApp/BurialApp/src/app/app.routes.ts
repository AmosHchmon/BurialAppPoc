import { Route } from '@angular/router';
import { AppShellLayout } from './layout/components/app-shell-layout/app-shell-layout';
import { Home } from './features/dashboard/components/home/home';

export const routes: Route[] = [
  {
    path: '',
    component: AppShellLayout,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  }
];
