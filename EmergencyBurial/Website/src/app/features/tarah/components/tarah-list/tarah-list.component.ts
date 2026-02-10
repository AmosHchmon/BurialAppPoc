import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';

import {UiComponentsModule} from '../../../../shared/ui-components/ui-components.module';
import {TarahService} from '../../services/tarah.service';
import {IColumn} from "../../../../shared/ui-components/model/column";
import {TarahList} from '../../model/TarahList';
import {TarahUpdateDialogComponent} from "../tarah-update-dialog/tarah-update-dialog.component";
import {BagReceptionDialogComponent} from "../bag-reception-dialog/bag-reception-dialog.component";
import {TarahStatusEnum} from "../../../../shared/enum/tarah-status.enum";
import {TarahProcess} from '../../model/TarahProcess';
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";

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
    {field: 'select', header: 'בחירה'},
    {field: 'IdentityNumber', header: 'מספר זהות'},
    {field: 'FullName', header: 'שם מלא'},
    {field: 'FatherName', header: 'שם אב'},
    {field: 'IsIdentified', header: 'האם מזוהה'},
    {field: 'ProcessStatusDesc', header: 'סטטוס תהליך'},
    {field: 'TarahStatusDesc', header: 'סטטוס תר"ח'},
    {field: 'BagNumbersDisplay', header: 'מספרי שק'},
    {field: 'RelatedBagNumbers', header: 'שקים מקושרים'},
  ];

  filterOptions = [
    {label: 'קליטה (משטרה/שינוע)', value: TarahStatusEnum.Pending},
    {label: 'בתהליך (מאוחסן)', value: TarahStatusEnum.InProgress},
    {label: 'שוחררו', value: TarahStatusEnum.Complete}
  ];
  selectedDeceased: TarahList | null = null;
  viewMode: TarahStatusEnum = TarahStatusEnum.InProgress;

  isUpdateDialogOpen: boolean = false;
  isReceptionDialogOpen: boolean = false;
  isReleaseAction: boolean = false;

  searchText: string = '';

  selectedDeceasedForReception: TarahProcess;
  selectedDeceasedForUpdate: TarahProcess;

  constructor(private tarahService: TarahService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {

    this.deceasedList = [];

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

  }

  onViewChange() {
    this.clearSearch();
    this.loadData();
  }

  async openReceptionDialog() {

    this.selectedDeceasedForReception = await this.tarahService.getDetailsForEdit(this.selectedDeceased.Id);
    this.isReceptionDialogOpen = true;
  }

  async openUpdateDetailsDialog() {

    if (this.selectedDeceased) {

      this.selectedDeceasedForUpdate = await this.tarahService.getDetailsForEdit(this.selectedDeceased.Id);
      this.isReleaseAction = false;
      this.isUpdateDialogOpen = true;
    }
  }

  async openReleaseDialog() {

    if (!this.selectedDeceased)
      return;

    if (!this.selectedDeceased.IsIdentified) {

      this.alertService.alert(AlertType.Warning, {ClientMessage: DialogMessage.BagNotIdentified});
      return;
    }

    this.selectedDeceasedForUpdate = await this.tarahService.getDetailsForEdit(this.selectedDeceased.Id);

    this.isReleaseAction = true;
    this.isUpdateDialogOpen = true;
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

  getTarahStatusSeverity(status: number | undefined) {
    return status === 2 ? 'success' : 'warn';
  }

  getIdentificationStatus(isIdentified: boolean | undefined): string {
    return isIdentified ? 'מזוהה' : 'לא מזוהה';
  }

  protected readonly TarahStatusEnum = TarahStatusEnum;
}
