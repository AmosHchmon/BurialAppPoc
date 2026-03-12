import { Route } from '@angular/router';
import { AppShellLayout } from './layout/components/app-shell-layout/app-shell-layout';
import { Home } from './features/dashboard/components/home/home';
import { DemoBarcode } from './features/dashboard/components/demo-barcode/demo-barcode';

export const routes: Route[] = [
  {
    path: '',
    component: AppShellLayout,
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: '',
        component: DemoBarcode
      }
    ]
  }
];
