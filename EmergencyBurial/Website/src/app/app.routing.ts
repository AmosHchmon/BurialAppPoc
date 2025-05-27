import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/components/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RedirectGuard } from './shared/guards/redirect.guard';

export const routes: Routes = [
  {
    path: '',
    children: [],
    pathMatch: 'full',
    canActivate: [RedirectGuard]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
       canActivateChild: [AuthGuard],
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
