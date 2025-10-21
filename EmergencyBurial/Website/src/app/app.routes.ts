import {Routes} from '@angular/router';

import {DashboardLayoutComponent} from './layout/components/dashboard-layout/dashboard-layout.component';
import {AuthLayoutComponent} from "./layout/components/auth-layout/auth-layout.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {ManagementLayoutComponent} from "./layout/components/management-layout/management-layout.component";
import {AdminGuard} from "./shared/guards/admin.guard";
import { RoleGuard } from './shared/guards/role.guard';
import { enmOrganizationType } from './shared/enum/organization-type.enum';

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
      }
    ]
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
        canActivate: [RoleGuard], data: { roles: [enmOrganizationType.Tarah,enmOrganizationType.DatServices,enmOrganizationType.Hamal]},
        loadChildren: () => import('./views/deceased/deceased.routing').then(m => m.DeceasedRouting)
      },
      {
        path: 'transport',
        loadChildren: () => import('./views/transport/transport.routing').then(m => m.TransportRouting)
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'management',
    component: ManagementLayoutComponent,
    children:[
      {
        path: '',
        loadChildren: () => import('./views/management/management.routing').then(m => m.ManagementRouting)
      }
    ],
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
