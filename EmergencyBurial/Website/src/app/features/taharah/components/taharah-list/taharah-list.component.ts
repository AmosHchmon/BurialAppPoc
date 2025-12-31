import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {Popover} from "primeng/popover";

import {Deceased} from "../../../deceased/model/Deceased";
import {TaharahService} from "../../services/taharah.service";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AlertService} from "../../../../shared/services/alert.service";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";
import {IOptionItem} from "../../../../shared/model/list-item";
import {ListService} from "../../../../shared/services/list.service";

@Component({
  selector: 'app-taharah-list',
  templateUrl: './taharah-list.component.html',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  styleUrls: ['./taharah-list.component.scss']
})
export class TaharahListComponent implements OnInit {

  @ViewChild('op') op!: Popover;
  @ViewChild('dt') dt: Table | undefined;

  taharahLocations: IOptionItem[];
  deceasedList: Deceased[] = [];
  cols: IColumn[] = [
    {field: 'select', header: 'בחירה'},
    {field: 'IdentityNumber', header: 'מספר זהות'},
    {field: 'FullName', header: 'שם מלא'},
    {field: 'FatherName', header: 'שם האב'},
    {field: 'ProcessStatusDesc', header: 'סטטוס'},
    {field: 'BagNumbersDisplay', header: 'מספרי שק'},
    {field: 'RelatedBagNumbers', header: 'שקים מקושרים'},
  ];
  viewOptions = [
    {label: 'פעילים בטהרה', value: false},
    {label: 'ממתינים לקליטה', value: true}
  ];

  selectedDeceased: Deceased | null = null;
  isPendingView: boolean = false;
  isPendingDialogOpen: boolean = false;
  isUpdateDialogOpen: boolean = false;
  selectedMonth: Date = new Date();
  searchText: string;

  constructor(private taharahService: TaharahService, private listService: ListService, private alertService: AlertService) {
  }

  ngOnInit(): void {

    this.loadData();
  }

  async loadData() {

    this.selectedDeceased = null;
    this.deceasedList = [];

    if (this.isPendingView) {

      this.deceasedList = await this.taharahService.getPendingList();

    } else {

      const month = this.selectedMonth.getMonth() + 1;
      const year = this.selectedMonth.getFullYear();

      this.deceasedList = await this.taharahService.getActiveList(month, year);
    }

  }

  onViewChange() {

    this.clearSearch();
    this.loadData();
  }

  openIntakeDialog() {

    if (!this.selectedDeceased) {
      return;
    }

    if (!this.selectedDeceased.DeceasedBurialDetails) {

      this.selectedDeceased.DeceasedBurialDetails = {
        DeceasedId: this.selectedDeceased.Id,
        TaharahReceptionStaff: '',
        TaharahReceptionDate: new Date(),
      };
    }

    this.isPendingDialogOpen = true;
  }

  async submitIntake() {

    if (!this.selectedDeceased || !this.selectedDeceased.DeceasedBurialDetails) {
      return;
    }

    await this.taharahService.receiveDeceased(this.selectedDeceased.DeceasedBurialDetails);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.DeceasedReceived});

    this.isPendingDialogOpen = false;
    this.selectedDeceased = null;

    await this.loadData();

  }

  async openUpdateDetailsDialog() {

    if (!this.selectedDeceased) {
      return;
    }

    this.taharahLocations = await this.listService.getTaharahLocations();

    this.isUpdateDialogOpen = true;
  }

  async submitUpdate() {

    await this.taharahService.updateDeceasedDetails(this.selectedDeceased.DeceasedBurialDetails);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.DeceasedUpdated});

    this.isUpdateDialogOpen = false;
    this.selectedDeceased = null;

    await this.loadData();

  }

  applyFilter() {

    this.loadData();
    this.op.hide();
  }

  clearFilter() {

    this.selectedMonth = new Date();
    this.loadData();
    this.op.hide();
  }

  clearSearch() {

    this.searchText = '';
    this.dt?.filterGlobal(null, 'contains');
  }

  getGlobalFilterFields() {

    return this.cols.map(col => col.field);
  }
}
