import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MediaMatcher, LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from './ui-components/ui-components.module';
import { HttpClientModule } from '@angular/common/http';
import { ValidFormDirective } from './directives/valid-form.directive';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileService } from './file-upload/services/file.service';
import { NgxTimepickerPipe } from '../core/pipes/ngx-timepicker.pipe';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AlertService } from './services/alert.service';
import { SideMenuService } from './services/side-menu.service';
import {ValidationModule} from "./validation/validation.module";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    UiComponentsModule,
    ValidationModule,
    LayoutModule,
    HttpClientModule,
    FileUploadModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxWebstorageModule.forRoot(),
  ],
  exports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ValidationModule,
    CoreModule,
    UiComponentsModule,
    LayoutModule,
    HttpClientModule,
    ValidFormDirective,
    FileUploadModule,
  ],
  providers: [
    MediaMatcher,
    FileService,
    AlertService,
    SideMenuService,
  ],
  declarations: [
    ValidFormDirective,
    NgxTimepickerPipe,
  ],

})
export class SharedModule {
}
