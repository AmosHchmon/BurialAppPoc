import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

import { UiComponentsModule } from '../../../../shared/ui-components/ui-components.module';
import { TarahService } from '../../services/tarah.service';
import { IColumn } from "../../../../shared/ui-components/model/column";
import { TarahList } from '../../model/TarahList';
import { TarahUpdateDialogComponent } from "../tarah-update-dialog/tarah-update-dialog.component";
import { BagReceptionDialogComponent } from "../bag-reception-dialog/bag-reception-dialog.component";
import { TarahStatusEnum } from "../../../../shared/enum/tarah-status.enum";
import { TarahBag, TarahProcess } from '../../model/TarahProcess';

@Component({
  selector: 'app-tarah-list',
  standalone: true,
  imports: [UiComponentsModule,
    TarahUpdateDialogComponent,
    BagReceptionDialogComponent
  ],
  templateUrl: './tarah-list.component.html',
  styleUrls: ['./tarah-list.component.scss']
})
export class TarahListComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;

  deceasedList: TarahList[] = [];
  cols: IColumn[] = [
    { field: 'select', header: 'בחירה' },
    { field: 'BagNumber', header: 'מספר שק' },
    { field: 'BagProcessStatusDesc', header: 'סטטוס שק' },
    { field: 'TarahStatusDesc', header: 'סטטוס תהליך' },
  ];

  filterOptions = [
    { label: 'קליטה (משטרה/שינוע)', value: TarahStatusEnum.Pending },
    { label: 'בתהליך (מאוחסן)', value: TarahStatusEnum.InProgress },
    { label: 'שוחררו', value: TarahStatusEnum.Complete }
  ];

  selectedDeceased: TarahList | null = null;
  selectedBagForReception: TarahBag | null = null;
  selectedDeceasedForReception: TarahProcess | null = null;
  selectedDeceasedIdForReception: string | undefined;

  viewMode: TarahStatusEnum = TarahStatusEnum.InProgress; // Default to InStorage

  // Dialog States
  isUpdateDialogOpen: boolean = false;
  isReceptionDialogOpen: boolean = false;
  isReleaseAction: boolean = false;

  searchText: string = '';

  constructor(private tarahService: TarahService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.deceasedList = [];

    try {
      switch (this.viewMode) {
        case TarahStatusEnum.Pending:
          this.deceasedList = await this.tarahService.getPendingList();
          break;
        case TarahStatusEnum.InProgress:
          this.deceasedList = await this.tarahService.getActiveList();
          break;
        case TarahStatusEnum.Complete:
          this.deceasedList = await this.tarahService.getReleasedList();
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  onViewChange() {
    this.clearSearch();
    this.loadData();
  }

  // New Method for Bag Reception
  async openBagReceptionDialog() {
    if (this.selectedDeceased) {
      // We need to fetch details to get the full TarahProcess object
      const details = await this.tarahService.getDetailsForEdit(this.selectedDeceased.DeceasedId!);
      if (details) {
        // Since the row IS a bag, we find the specific bag from details by its Id
        const bagInDetails = details.Bags?.find(b => b.Id === this.selectedDeceased?.Id);

        if (bagInDetails) {
          this.selectedDeceasedIdForReception = this.selectedDeceased.DeceasedId;
          this.selectedDeceasedForReception = details;
          this.selectedBagForReception = bagInDetails;
          this.isReceptionDialogOpen = true;
        }
      }
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
    this.isReceptionDialogOpen = false;
    await this.loadData();
  }

  clearSearch() {
    this.searchText = '';
    this.dt?.filterGlobal(null, 'contains');
  }

  getGlobalFilterFields() {
    return this.cols.map(col => col.field);
  }

  getTarahStatusSeverity(TarahStatus: TarahStatusEnum) {
    switch (TarahStatus) {
      case TarahStatusEnum.Pending:
        return 'warn';
      case TarahStatusEnum.InProgress:
        return 'info';
      case TarahStatusEnum.Complete:
        return 'success';
      default:
        return 'secondary';
    }
  }

  protected readonly TarahStatusEnum = TarahStatusEnum;
}
