import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CardModule} from "primeng/card";
import {Table, TableModule} from "primeng/table";
import {Deceased} from "../../model/deceased";
import {AlertService} from "../../../../../shared/services/alert.service";
import {DeceasedService} from "../../services/deceased.service";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {IColumn} from "../../../../../shared/ui-components/model/column";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-deceaseds-list',
  imports: [
    TableModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputText,
    FormsModule
  ],
  templateUrl: './deceaseds-list.component.html',
  standalone: true,
  styleUrl: './deceaseds-list.component.scss',
})
export class DeceasedsListComponent implements OnInit {

  @ViewChild('dt') dt: Table<Deceased> | undefined;

  cols: IColumn[] = [];
  fields: IColumn[] = [];
  deceasedList: Deceased[] = [];
  searchText: string;

  constructor(private deceasedService: DeceasedService,
              private alertService: AlertService,
              private router: Router,
              private cdr: ChangeDetectorRef) {

    this.deceasedService = deceasedService;
    this.alertService = alertService;
  }

  async ngOnInit() {

    this.deceasedList = await this.deceasedService.getDeceaseds();

    this.initCols();

    this.cdr.detectChanges();

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

    this.cols = [
      {field: 'HalalNumber', header: 'מספר חלל'},
      {field: 'IdentityNumber', header: 'מספר זהות'},
      {field: 'FirstName', header: 'שם פרטי'},
      {field: 'LastName', header: 'שם משפחה'},
      {field: 'FatherName', header: 'שם האב'},
    ];
  }

  getGlobalFilterFields(): string[] {

    return this.cols.map(col => col.field);
  }

  showDeceased(deceased: Deceased): void {

    this.router.navigate(['/dashboard/deceaseds', deceased.HalalNumber]);
  }

  clearSearch() {

    this.searchText = '';

    if (this.dt) {
      this.dt.filterGlobal(null, 'contains');
    }
  }
}
