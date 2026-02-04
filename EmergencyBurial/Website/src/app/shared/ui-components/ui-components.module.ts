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
import {RippleModule} from "primeng/ripple";
import {TabsModule} from "primeng/tabs";
import {DrawerModule} from "primeng/drawer";
import {MenuModule} from "primeng/menu";

import {FileService} from '../file-upload/services/file.service';
import {CheckboxModule} from "primeng/checkbox";
import {TextareaModule} from "primeng/textarea";
import {SelectModule} from "primeng/select";
import {DatePickerModule} from "primeng/datepicker";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {AutoFocusModule} from "primeng/autofocus";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {ToggleButtonModule} from "primeng/togglebutton";
import {TooltipModule} from "primeng/tooltip";
import {PopoverModule} from "primeng/popover";
import {TagModule} from "primeng/tag";
import {SelectButtonModule} from "primeng/selectbutton";
import {DividerModule} from "primeng/divider";
import {ChipModule} from "primeng/chip";
import {EmptyDataComponent} from "../components/empty-data/empty-data.component";
import {PasswordModule} from "primeng/password";
import {InputOtpModule} from "primeng/inputotp";
import {AvatarModule} from "primeng/avatar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MultiSelectModule} from "primeng/multiselect";

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
    TabsModule,
    DrawerModule,
    MenuModule,
    CheckboxModule,
    TextareaModule,
    SelectModule,
    SelectButtonModule,
    DatePickerModule,
    ToolbarModule,
    DialogModule,
    AutoFocusModule,
    ConfirmDialogModule,
    RadioButtonModule,
    ToggleButtonModule,
    TooltipModule,
    PopoverModule,
    TagModule,
    DividerModule,
    ChipModule,
    PasswordModule,
    InputOtpModule,
    AvatarModule,
    AutoCompleteModule,
    MultiSelectModule,
    EmptyDataComponent
  ],
  exports: [
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    CardModule,
    AccordionModule,
    TableModule,
    TabsModule,
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
    DrawerModule,
    MenuModule,
    RippleModule,
    TabsModule,
    CheckboxModule,
    TextareaModule,
    SelectModule,
    SelectButtonModule,
    DatePickerModule,
    ToolbarModule,
    DialogModule,
    AutoFocusModule,
    ConfirmDialogModule,
    RadioButtonModule,
    ToggleButtonModule,
    TooltipModule,
    PopoverModule,
    TagModule,
    DividerModule,
    ChipModule,
    PasswordModule,
    InputOtpModule,
    AvatarModule,
    AutoCompleteModule,
    MultiSelectModule,
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
