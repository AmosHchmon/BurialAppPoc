import {Routes} from '@angular/router';
import {DashboardLayoutComponent} from './layout/components/dashboard-layout/dashboard-layout.component';
import {HomeComponent} from './views/components/home/home.component';
import {DeceasedsListComponent} from './views/components/deceased/components/deceaseds-list/deceaseds-list.component';
import {TransportComponent} from './views/components/transport/transport.component';
import {AuthLayoutComponent} from './layout/components/auth-layout/auth-layout.component';
import {LoginComponent} from './views/components/login/login.component';
import {DeceasedDetailComponent} from "./views/components/deceased/components/deceased-detail/deceased-detail.component";

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
        path: 'deceaseds',
        component: DeceasedsListComponent,
      },
      {
        path: 'deceaseds/:id',
        component: DeceasedDetailComponent,
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
