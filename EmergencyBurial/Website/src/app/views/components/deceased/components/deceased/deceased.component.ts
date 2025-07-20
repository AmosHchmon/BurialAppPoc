import {Component, OnInit, ViewChild, WritableSignal} from '@angular/core';
import {Card} from "primeng/card";
import {Table, TableModule} from "primeng/table";
import {Deceased} from "../../model/deceased";
import {AlertService} from "../../../../../shared/services/alert.service";
import {DeceasedService} from "../../services/deceased.service";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {DeceasedDialogComponent} from "../deceased-dialog/deceased-dialog.component";
import {IColumn} from "../../../../../shared/ui-components/model/column";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-deceased',
  imports: [
    Card,
    TableModule,
    IconField,
    InputIcon,
    InputText,
    Button,
    Dialog,
    DeceasedDialogComponent,
    FormsModule
  ],
  templateUrl: './deceased.component.html',
  standalone: true,
  styleUrl: './deceased.component.scss',
})
export class DeceasedComponent implements OnInit {

  @ViewChild('dt') dt: Table<Deceased> | undefined;

  cols: IColumn[] = [];
  fields: IColumn[] = [];
  deceasedList: Deceased[] = [];
  selectedDeceased: Deceased;
  detailsDialogVisible: boolean | WritableSignal<boolean>;
  searchText: string;

  constructor(private deceasedService: DeceasedService,
              private alertService: AlertService) {

    this.deceasedService = deceasedService;
    this.alertService = alertService;
  }

  async ngOnInit() {

    try {

      this.deceasedList = await this.deceasedService.getDeceaseds();

      this.initCols();

    } catch (err) {
      this.alertService.error(err);
    }

  }

  initCols() {

    this.fields = [
      {field: 'HalalNumber', header: 'מספר חלל'},
      {field: 'IdentityNumber', header: 'מספר זהות'},
      {field: 'FirstName', header: 'שם פרטי'},
      {field: 'LastName', header: 'שם משפחה'},
      {field: 'FatherName', header: 'שם האב'},
      {field: 'Gender', header: 'מין'},
      {field: 'Nationality', header: 'לאום'},
      {field: 'HomeCity', header: 'עיר מגורים'},
      {field: 'HomeAddress', header: 'כתובת'},
      {field: 'CurrentStatusId', header: 'סטטוס'},
      {field: 'CurrentLocationId', header: 'מיקום'},
      {field: 'IsLinkedToOtherCasesValue', header: 'מקושר למקרים'},
      {field: 'BurialCity', header: 'עיר קבורה'},
      {field: 'IsCivilBurialValue', header: 'קבורה אזרחית'},
      {field: 'Notes', header: 'הערות'}
    ];

    this.cols=[
      {field: 'HalalNumber', header: 'מספר חלל'},
      {field: 'IdentityNumber', header: 'מספר זהות'},
      {field: 'FirstName', header: 'שם פרטי'},
      {field: 'LastName', header: 'שם משפחה'},
      {field: 'FatherName', header: 'שם האב'},
    ]
  }

  getGlobalFilterFields(): string[] {

    return this.cols.map(col => col.field);
  }

  showDetails(selectedRow: Deceased) {

    this.selectedDeceased = {...selectedRow};
    this.detailsDialogVisible = true;
  }

  hideDetailsDialog() {

    this.detailsDialogVisible = false;
    this.selectedDeceased = null;
  }

  clearSearch() {

    this.searchText = '';

    if (this.dt) {
      this.dt.filterGlobal(null, 'contains');
    }
  }
}
