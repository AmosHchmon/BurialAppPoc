import {Routes} from '@angular/router';

import {DashboardLayoutComponent} from './layout/components/dashboard-layout/dashboard-layout.component';
import {AuthLayoutComponent} from "./layout/components/auth-layout/auth-layout.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/login/login.routing').then(m => m.LoginRouting)
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.routing').then(m => m.HomesRoutes)
      },
      {
        path: 'deceaseds',
        loadChildren: () => import('./views/deceased/deceased.routing').then(m => m.DeceasedRouting)
      },
      {
        path: 'transport',
        loadChildren: () => import('./views/transport/transport.routing').then(m => m.TransportRouting)
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
