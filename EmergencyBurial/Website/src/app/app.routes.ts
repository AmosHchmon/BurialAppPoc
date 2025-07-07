import {Routes} from '@angular/router';
import {DashboardLayoutComponent} from './layout/components/dashboard-layout/dashboard-layout.component';
import {HomeComponent} from './views/components/home/home.component';
import {DeceasedComponent} from './views/components/deceased/deceased.component';
import {TransportComponent} from './views/components/transport/transport.component';

export const routes: Routes = [
  {
    path: '',
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
  // You might want a wildcard route for 404s outside the layout
  {path: '**', redirectTo: ''}, // Redirects any unmatched routes to the base
];
