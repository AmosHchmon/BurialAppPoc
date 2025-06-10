import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MediaMatcher, LayoutModule} from '@angular/cdk/layout';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {UiComponentsModule} from './ui-components/ui-components.module';
import {ValidFormDirective} from './directives/valid-form.directive';
import {FileUploadModule} from './file-upload/file-upload.module';
import {FileService} from './file-upload/services/file.service';
import {NgxTimepickerPipe} from '../core/pipes/ngx-timepicker.pipe';
import {ToastrModule} from 'ngx-toastr';
import {provideNgxWebstorage} from 'ngx-webstorage';
import {AlertService} from './services/alert.service';
import {ValidationModule} from './validation/validation.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    UiComponentsModule,
    ValidationModule,
    LayoutModule,
    FileUploadModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ValidationModule,
    CoreModule,
    UiComponentsModule,
    LayoutModule,
    ValidFormDirective,
    FileUploadModule,
  ],
  providers: [
    MediaMatcher,
    FileService,
    AlertService,
    provideNgxWebstorage(),
  ],
  declarations: [
    ValidFormDirective,
    NgxTimepickerPipe,
  ],

})
export class SharedModule {
}
