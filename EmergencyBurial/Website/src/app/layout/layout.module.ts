import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import {DashboardLayoutComponent} from './components/dashboard-layout/dashboard-layout.component';
import {SharedModule} from '../shared/shared.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import {TestViewerComponent} from './components/test-viewer/test-viewer.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    TestViewerComponent
  ],
  exports: [
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    SharedModule
  ],
})
export class LayoutModule {
}
