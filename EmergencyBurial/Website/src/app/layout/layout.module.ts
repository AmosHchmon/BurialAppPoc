import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent
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
