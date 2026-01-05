import {Routes} from '@angular/router';

import {DashboardLayoutComponent} from './layout/components/dashboard-layout/dashboard-layout.component';
import {AuthLayoutComponent} from "./layout/components/auth-layout/auth-layout.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {RoleGuard} from './shared/guards/role.guard';
import {enmOrganizationType} from './shared/enum/organization-type.enum';
import {AdminLayoutComponent} from "./layout/components/admin-layout/admin-layout.component";
import {NotAuthorizedComponent} from "./features/not-authorized/not-authorized.component";

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
        loadChildren: () => import('./features/account/login.routing').then(m => m.LoginRouting)
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
        loadChildren: () => import('./features/dashboard/home.routing').then(m => m.HomesRoutes)
      },
      {
        path: 'deceaseds',
        canMatch: [RoleGuard], data: {roles: [enmOrganizationType.Tarah, enmOrganizationType.DatServices]},
        loadChildren: () => import('./features/deceased/deceased.routing').then(m => m.DeceasedRouting)
      },
      {
        path: 'transport',
        canMatch: [RoleGuard], data: {roles: [enmOrganizationType.All]},
        loadChildren: () => import('./features/transport/transport.routing').then(m => m.TransportRouting)
      },
    ],
    canMatch: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/admin/management.routing').then(m => m.ManagementRouting)
      }
    ],
    canMatch: [RoleGuard], data: {roles: [enmOrganizationType.Hamal]},
  },
  {
    path: 'access-denied',
    component: NotAuthorizedComponent
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
