import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {CardModule} from "primeng/card";
import {AccordionModule} from "primeng/accordion";
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "primeng/message";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";


import {FileService} from '../file-upload/services/file.service';
import {RippleModule} from "primeng/ripple";
import {TabsModule} from "primeng/tabs";

@NgModule({
  imports: [
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    CardModule,
    AccordionModule,
    TableModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    MessageModule,
    FloatLabelModule,
    InputGroupAddonModule,
    InputGroupModule,
    RippleModule,
    TabsModule
  ],
  exports: [
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    CardModule,
    AccordionModule,
    TableModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    MessageModule,
    FloatLabelModule,
    InputGroupAddonModule,
    InputGroupModule,
    RippleModule,
    TabsModule
  ],
  declarations: [
  ],
  providers: [
    FileService,
    {provide: MAT_DATE_LOCALE, useValue: 'he-IL'},
  ],
})
export class UiComponentsModule {
}
