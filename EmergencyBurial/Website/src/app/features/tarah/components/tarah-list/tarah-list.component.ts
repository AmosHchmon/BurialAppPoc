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
import {TarahBagProcessEnum} from "../../../../shared/enum/tarah-bag-process.enum";
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

  bagList: TarahList[] = [];
  cols: IColumn[] = [
    {field: 'select', header: 'בחירה'},
    {field: 'BagNumber', header: 'מספר שק'},
    {field: 'BagProcessStatusDesc', header: 'סטטוס שק'},
    {field: 'IsIdentified', header: 'סטטוס זיהוי'},
  ];

  filterOptions = [
    {label: 'קליטה (משטרה/שינוע)', value: TarahStatusEnum.Pending},
    {label: 'בתהליך (מאוחסן)', value: TarahStatusEnum.InProgress},
    {label: 'שוחררו', value: TarahStatusEnum.Complete}
  ];
  selectedBag: TarahList | null = null;
  viewMode: TarahStatusEnum = TarahStatusEnum.InProgress;

  isUpdateDialogOpen: boolean = false;
  isReceptionDialogOpen: boolean = false;
  isReleaseAction: boolean = false;

  searchText: string = '';

  selectedBagForReception: TarahProcess;
  selectedBagForUpdate: TarahProcess;

  constructor(private tarahService: TarahService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {

    this.bagList = [];

    switch (this.viewMode) {

      case TarahStatusEnum.Pending:
        this.bagList = await this.tarahService.getPendingList();
        break;

      case TarahStatusEnum.InProgress:
        this.bagList = await this.tarahService.getActiveList();
        break;

      case TarahStatusEnum.Complete:
        this.bagList = await this.tarahService.getReleasedList();
        break;
    }

  }

  onViewChange() {
    this.clearSearch();
    this.loadData();
  }

  async openBagReceptionDialog() {

    if (this.selectedBag) {

      this.selectedBagForReception = await this.tarahService.getDetailsForEdit(this.selectedBag.BagNumber);
      this.isReceptionDialogOpen = true;
    }
  }

  async openUpdateDetailsDialog() {

    if (this.selectedBag) {

      this.selectedBagForUpdate = await this.tarahService.getDetailsForEdit(this.selectedBag.BagNumber);
      this.isReleaseAction = false;
      this.isUpdateDialogOpen = true;
    }
  }

  async openReleaseDialog() {

    if (!this.selectedBag)
      return;

    if (!this.selectedBag.IsIdentified) {

      this.alertService.alert(AlertType.Warning, {ClientMessage: DialogMessage.BagNotIdentified});
      return;
    }

    this.selectedBagForUpdate = await this.tarahService.getDetailsForEdit(this.selectedBag.BagNumber);

    this.isReleaseAction = true;
    this.isUpdateDialogOpen = true;
  }

  async onDialogSaved() {

    this.selectedBag = null;
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

  getTarahStatusSeverity(BagProcessStatus: TarahBagProcessEnum) {

    switch (BagProcessStatus) {

      case TarahBagProcessEnum.PoliceIntake:
        return 'warn';

      case TarahBagProcessEnum.Transport:
        return 'info';

      case TarahBagProcessEnum.InStorage:
        return 'success';

      case TarahBagProcessEnum.Released:
        return 'success';

      default:
        return 'secondary';
    }
  }

  getIdentificationStatus(isIdentified: boolean | undefined): string {
    return isIdentified ? 'מזוהה' : 'לא מזוהה';
  }

  protected readonly TarahStatusEnum = TarahStatusEnum;
}
