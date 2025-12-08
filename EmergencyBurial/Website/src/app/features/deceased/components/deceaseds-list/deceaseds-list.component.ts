import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {Deceased} from "../../model/Deceased";
import {DeceasedService} from "../../services/deceased.service";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {SignalRService} from "../../../../shared/services/signalR.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AlertService} from "../../../../shared/services/alert.service";


@Component({
  selector: 'app-deceaseds-list',
  imports: [UiComponentsModule],
  templateUrl: './deceaseds-list.component.html',
  standalone: true,
  styleUrl: './deceaseds-list.component.scss',
})
export class DeceasedsListComponent implements OnInit, OnDestroy {

  @ViewChild('dt') dt: Table<Deceased> | undefined;

  cols: IColumn[] = [];
  fields: IColumn[] = [];
  deceasedList: Deceased[] = [];
  searchText: string;

  private deceasedSubscription: Subscription | undefined;

  constructor(private deceasedService: DeceasedService,
              private alertService: AlertService,
              private router: Router,
              private signalRService: SignalRService) {

  }

  async ngOnInit() {

    this.deceasedList = await this.deceasedService.getDeceaseds();

    this.initCols();

    this.subscribeToHubEvents();

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

    this.router.navigate(['/dashboard/deceaseds', deceased.Id]);
  }

  clearSearch() {

    this.searchText = '';

    if (this.dt) {
      this.dt.filterGlobal(null, 'contains');
    }
  }

  private subscribeToHubEvents(): void {

    this.deceasedSubscription = this.signalRService.newDeceased.subscribe(
      (newDeceased: Deceased) => {

        this.deceasedList.unshift(newDeceased);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.NewDeceasedAdded});
      }
    );
  }

  unSubscribeToHubEvents() {

    if (this.deceasedSubscription) {
      this.deceasedSubscription.unsubscribe();
    }

  }

  ngOnDestroy(): void {

    this.unSubscribeToHubEvents();

  }
}
