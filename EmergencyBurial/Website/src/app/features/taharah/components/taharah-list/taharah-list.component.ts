import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';

import {TaharahService} from "../../services/taharah.service";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {TaharahList} from "../../model/TaharahList";
import {TaharahIntakeDialogComponent} from "../taharah-intake-dialog/taharah-intake-dialog.component";
import {TaharahUpdateDialogComponent} from "../taharah-update-dialog/taharah-update-dialog.component";
import {DeceasedProcessStatus} from "../../../../shared/enum/deceased-process-status.enum";

@Component({
  selector: 'app-taharah-list',
  templateUrl: './taharah-list.component.html',
  imports: [UiComponentsModule, TaharahIntakeDialogComponent, TaharahUpdateDialogComponent],
  styleUrls: ['./taharah-list.component.scss']
})
export class TaharahListComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;

  deceasedList: TaharahList[] = [];
  cols: IColumn[] = [
    {field: 'select', header: 'בחירה'},
    {field: 'IdentityNumber', header: 'מספר זהות'},
    {field: 'FullName', header: 'שם מלא'},
    {field: 'FatherName', header: 'שם האב'},
    {field: 'DeceasedProcessStatusDesc', header: 'סטטוס תהליך'},
    {field: 'BagNumbersDisplay', header: 'מספרי שק'},
    {field: 'RelatedBagNumbers', header: 'שקים מקושרים'},
  ];
  viewOptions = [
    {label: 'ממתינים לקליטה', value: DeceasedProcessStatus.EndTransportBurialPreparation},
    {label: 'פעילים בטהרה', value: DeceasedProcessStatus.ReceivedForBurialPreparation},
    {label: 'שוחררו מטהרה', value: DeceasedProcessStatus.ReleasedFromBurialPreparation}
  ];

  selectedDeceased: TaharahList | null = null;

  viewMode: DeceasedProcessStatus = DeceasedProcessStatus.EndTransportBurialPreparation;
  isPendingDialogOpen: boolean = false;
  isUpdateDialogOpen: boolean = false;
  isReleaseAction: boolean = false;
  searchText: string;

  constructor(private taharahService: TaharahService) {
  }

  ngOnInit(): void {

    this.loadData();
  }

  async loadData() {

    this.deceasedList = [];

    switch (this.viewMode) {

      case DeceasedProcessStatus.EndTransportBurialPreparation:
        this.deceasedList = await this.taharahService.getPendingList();
        break;

      case DeceasedProcessStatus.ReceivedForBurialPreparation:
        this.deceasedList = await this.taharahService.getActiveList();
        break;

      case DeceasedProcessStatus.ReleasedFromBurialPreparation:
        this.deceasedList = await this.taharahService.getReleasedList();
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

      this.isReleaseAction = false;
      this.isUpdateDialogOpen = true;
    }
  }

  openReleaseDialog() {

    if (this.selectedDeceased) {

      this.isReleaseAction = true;
      this.isUpdateDialogOpen = true;
    }
  }

  async onDialogSaved() {

    this.selectedDeceased = null;
    await this.loadData();
  }

  clearSearch() {

    this.searchText = '';
    this.dt?.filterGlobal(null, 'contains');
  }

  getGlobalFilterFields() {

    return this.cols.map(col => col.field);
  }

  getProcessStatusSeverity(deceasedProcessStatus: DeceasedProcessStatus) {

    switch (deceasedProcessStatus) {
      case DeceasedProcessStatus.EndTransportBurialPreparation:
        return 'warn';

      case DeceasedProcessStatus.ReceivedForBurialPreparation:
        return 'info';

      case DeceasedProcessStatus.ReleasedFromBurialPreparation:
        return 'success';

      default:
        return 'secondary';
    }

  }

  protected readonly DeceasedProcessStatus = DeceasedProcessStatus;
}
