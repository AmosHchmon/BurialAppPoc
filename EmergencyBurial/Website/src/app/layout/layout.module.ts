import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {FormsModule} from '@angular/forms';
import {DashboardLayoutComponent} from './components/dashboard-layout/dashboard-layout.component';
import {SharedModule} from '../shared/shared.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    HeaderComponent,
    SideMenuComponent,
    DashboardLayoutComponent
  ],
  exports: [
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class LayoutModule {
}
