import {NgModule} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator'
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgOptimizedImage} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
//import { SignaturePadModule } from 'angular2-signaturepad';
import {MatConvertTimezoneDirective} from './directives/mat-convert-timezone.directive';
import {FileService} from '../file-upload/services/file.service';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule, MAT_DATE_LOCALE, MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  imports: [
    NgOptimizedImage,
    FormsModule,
    //material design module
    MatOptionModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatSidenavModule,
    //ngx-bootstrap
    // TabsModule.forRoot(),
    // ModalModule.forRoot(),
    // RatingModule.forRoot(),
    //SignaturePadModule,
    CommonModule
  ],
  exports: [
    NgOptimizedImage,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatConvertTimezoneDirective,
    MatExpansionModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    MatSidenavModule
  ],
  declarations: [
    MatConvertTimezoneDirective,
  ],
  providers: [
    FileService,
    {provide: MAT_DATE_LOCALE, useValue: 'he-IL'},
    //{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    //{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class UiComponentsModule {
}
