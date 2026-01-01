import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {Popover} from "primeng/popover";

import {TaharahService} from "../../services/taharah.service";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {TaharahList} from "../../model/TaharahList";
import {TaharahIntakeDialogComponent} from "../taharah-intake-dialog/taharah-intake-dialog.component";
import {TaharahUpdateDialogComponent} from "../taharah-update-dialog/taharah-update-dialog.component";
import {TaharahStatusEnum} from "../../../../shared/enum/taharah-status.enum";

type ViewMode = 'pending' | 'active' | 'released';

@Component({
  selector: 'app-taharah-list',
  templateUrl: './taharah-list.component.html',
  imports: [UiComponentsModule, TaharahIntakeDialogComponent, TaharahUpdateDialogComponent],
  styleUrls: ['./taharah-list.component.scss']
})
export class TaharahListComponent implements OnInit {

  @ViewChild('op') op!: Popover;
  @ViewChild('dt') dt: Table | undefined;

  deceasedList: TaharahList[] = [];
  cols: IColumn[] = [
    {field: 'select', header: 'בחירה'},
    {field: 'IdentityNumber', header: 'מספר זהות'},
    {field: 'FullName', header: 'שם מלא'},
    {field: 'FatherName', header: 'שם האב'},
    {field: 'ProcessStatusDesc', header: 'סטטוס תהליך'},
    {field: 'TaharahStatusDesc', header: 'סטטוס טהרה'},
    {field: 'BagNumbersDisplay', header: 'מספרי שק'},
    {field: 'RelatedBagNumbers', header: 'שקים מקושרים'},
  ];
  viewOptions = [
    {label: 'ממתינים לקליטה', value: 'pending'},
    {label: 'פעילים בטהרה', value: 'active'},
    {label: 'שוחררו מטהרה', value: 'released'}
  ];

  selectedDeceased: TaharahList | null = null;

  viewMode: ViewMode = 'pending';
  isPendingDialogOpen: boolean = false;
  isUpdateDialogOpen: boolean = false;
  selectedMonth: Date = new Date();
  searchText: string;

  constructor(private taharahService: TaharahService) {
  }

  ngOnInit(): void {

    this.loadData();
  }

  async loadData() {

    this.selectedDeceased = null;
    this.deceasedList = [];

    const month = this.selectedMonth.getMonth() + 1;
    const year = this.selectedMonth.getFullYear();

    switch (this.viewMode) {

      case 'pending':
        this.deceasedList = await this.taharahService.getPendingList();
        break;

      case 'active':
        this.deceasedList = await this.taharahService.getActiveList(month, year);
        break;

      case 'released':
        this.deceasedList = await this.taharahService.getReleasedList(month, year);
        break;
    }
  }

  onViewChange() {

    this.clearSearch();
    this.loadData();
  }

  openIntakeDialog() {

    if (this.selectedDeceased) {
      this.isPendingDialogOpen = true;
    }
  }

  openUpdateDetailsDialog() {

    if (this.selectedDeceased) {
      this.isUpdateDialogOpen = true;
    }
  }

  async onDialogSaved() {

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

  getTaharahStatusSeverity(TaharahStatus: TaharahStatusEnum) {

    switch (TaharahStatus) {
      case TaharahStatusEnum.Pending:
        return 'warn';

      case TaharahStatusEnum.InProgress:
        return 'info';

      case TaharahStatusEnum.Complete:
        return 'success';

      default:
        return 'secondary';
    }

  }
}
