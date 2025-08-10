import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Router} from "@angular/router";

import {Deceased} from "../../model/deceased";
import {DeceasedService} from "../../services/deceased.service";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {AlertService} from "../../../../shared/services/alert.service";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";

@Component({
  selector: 'app-deceaseds-list',
  imports: [UiComponentsModule],
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

    try {

      this.deceasedList = await this.deceasedService.getDeceaseds();

      this.initCols();

      this.cdr.detectChanges();

    } catch (err) {
      this.alertService.alert(err);
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
