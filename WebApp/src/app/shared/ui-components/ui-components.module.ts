import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {FileService} from '../file-upload/services/file.service';
import {EmptyDataComponent} from "../components/empty-data/empty-data.component";

@NgModule({
  imports: [
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    FormsModule,
    EmptyDataComponent
  ],
  exports: [
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    FormsModule,
    EmptyDataComponent
  ],
  declarations: [],
  providers: [
    FileService,
    {provide: MAT_DATE_LOCALE, useValue: 'he-IL'},
  ],
})
export class UiComponentsModule {
}
