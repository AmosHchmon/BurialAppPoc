import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutModule, MediaMatcher} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";

import {UiComponentsModule} from './ui-components/ui-components.module';
import {ValidFormDirective} from './directives/valid-form.directive';
import {NgxTimepickerPipe} from '../core/pipes/ngx-timepicker.pipe';
import {ValidationModule} from "./validation/validation.module";

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    UiComponentsModule,
    ValidationModule,
    LayoutModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ValidationModule,
    UiComponentsModule,
    LayoutModule,
    ValidFormDirective,
    NgxTimepickerPipe,
    ValidFormDirective,
  ],
  providers: [
    MediaMatcher,
  ],
  declarations: [
    ValidFormDirective,
    NgxTimepickerPipe,
  ],

})
export class SharedModule {
}
