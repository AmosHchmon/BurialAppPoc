import { Route } from '@angular/router';
import { AppShellLayout } from './layout/components/app-shell-layout/app-shell-layout';
import { Home } from './features/dashboard/components/home/home';
import { ScannerComponent } from './features/dashboard/components/scanner/scanner';
import { ManualSelectionBug } from './features/dashboard/components/manual-selection-bug/manual-selection-bug';
import { ActiveTransport } from './features/dashboard/components/active-transport/active-transport';

export const routes: Route[] = [
  {
    path: '',
    component: AppShellLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'scan',
        component: ScannerComponent
      },
      {
        path: 'manual-selection',
        component: ManualSelectionBug
      },
      {
        path: 'active-transport',
        component: ActiveTransport
      }
    ]
  }
];
