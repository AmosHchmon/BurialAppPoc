import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {Deceased} from "../../../deceased/model/Deceased";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {DeceasedService} from "../../../deceased/services/deceased.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {SignalRService} from "../../../../shared/services/signalR.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {ValidationModule} from "../../../../shared/validation/validation.module";

@Component({
  selector: 'app-deceaseds-management',
  imports: [UiComponentsModule, ValidationModule],
  templateUrl: './deceaseds-management.component.html',
  styleUrl: './deceaseds-management.component.scss'
})
export class DeceasedsManagementComponent implements OnInit, OnDestroy {

  @ViewChild('dt') dt: Table<Deceased> | undefined;

  cols: IColumn[] = [];
  fields: IColumn[] = [];
  deceasedList: Deceased[] = [];
  newDeceased: Deceased = {};
  searchText: string;
  showDeceasedDialog: boolean = false;

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

  onAddDeceased() {

    this.showDeceasedDialog = true;
  }

  onEditDeceased() {

  }

  onDeleteDeceased() {

  }

  unSubscribeToHubEvents() {

    if (this.deceasedSubscription) {
      this.deceasedSubscription.unsubscribe();
    }

  }

  ngOnDestroy(): void {

    this.unSubscribeToHubEvents();

  }

  private subscribeToHubEvents(): void {

    this.deceasedSubscription = this.signalRService.deceased.subscribe(
      (newDeceased: Deceased) => {

        this.deceasedList.unshift(newDeceased);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.NewDeceasedAdded});
      }
    );
  }

  onSaveDeceased() {

  }
}
