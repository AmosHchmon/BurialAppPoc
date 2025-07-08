import {Routes} from '@angular/router';
import {DashboardLayoutComponent} from './layout/components/dashboard-layout/dashboard-layout.component';
import {HomeComponent} from './views/components/home/home.component';
import {DeceasedComponent} from './views/components/deceased/deceased.component';
import {TransportComponent} from './views/components/transport/transport.component';
import {AuthLayoutComponent} from './layout/components/auth-layout/auth-layout.component';
import {LoginComponent} from './views/components/login/login.component';

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
        component: LoginComponent,
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
        component: HomeComponent,
      },
      {
        path: 'deceased',
        component: DeceasedComponent,
      },
      {
        path: 'transport',
        component: TransportComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
