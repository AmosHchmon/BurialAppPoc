import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ConfirmationService} from "primeng/api";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {DeceasedBurialProcessStatus} from "../../model/DeceasedBurialProcessStatus";
import {IOptionItem} from "../../../../shared/model/list-item";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";
import {DialogMessage} from "../../../../shared/static/messages";
import {DeceasedService} from "../../services/deceased.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {
  BadMessageProcessOptions,
  CollectionStatusOptions,
  IdentificationStatusOptions
} from "../../../../shared/enum/status.enum";

@Component({
  selector: 'app-burial-process-form',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  templateUrl: './burial-process-form.component.html',
  styleUrl: './burial-process-form.component.scss'
})
export class BurialProcessFormComponent implements OnInit, OnChanges {

  @Input('isEdit') isEdit: boolean = false;
  @Input('deceasedId') deceasedId: string = '';
  @Output() editModeChange = new EventEmitter<boolean>();

  private originalDataBackup: string;

  burialProcessData: DeceasedBurialProcessStatus;

  identificationStatus: IOptionItem[] = BadMessageProcessOptions;
  badMessageProcessStatus: IOptionItem[] = CollectionStatusOptions;
  collectionStatus: IOptionItem[] = IdentificationStatusOptions;
  burialStatus: IOptionItem[];

  constructor(private listService: ListService,
              private deceasedService: DeceasedService,
              private alertService: AlertService,
              private confirmService: ConfirmationService) {
  }

  //#region [Lifecycle events]

  async ngOnInit() {

    this.burialProcessData = await this.deceasedService.getDeceasedBurialProcessStatus(this.deceasedId);

    this.burialProcessData.BadMessageStartDate = this.burialProcessData.BadMessageStartDate ? new Date(this.burialProcessData.BadMessageStartDate) : null;

    await this.loadLists();
  }

  ngOnChanges() {

    if (this.burialProcessData) {
      this.burialProcessData.BadMessageStartDate = this.burialProcessData.BadMessageStartDate ? new Date(this.burialProcessData.BadMessageStartDate) : null;
    }
  }

  private async loadLists() {
    this.burialStatus = await this.listService.getBurialStatus();
  }

  //endregion

  //#region [Client events]

  toggleEdit() {

    if (!this.isEdit) {
      this.originalDataBackup = JSON.stringify(this.burialProcessData);
    }

    this.editModeChange.emit(!this.isEdit);
  }

  async onSaveBurialProcess() {

    const updatedBurialProcess = await this.deceasedService.updateBurialProcess(this.burialProcessData);

    if (updatedBurialProcess) {
      this.burialProcessData = {...updatedBurialProcess};

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

      this.editModeChange.emit(false);
    }

  }

  cancelEdit() {

    this.confirmService.confirm({
      header: DialogMessage.Cancel,
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: async () => {

        this.restoreOriginalData();

        this.editModeChange.emit(false);

      },
      reject: () => {
        return;
      }

    })
  }

  restoreOriginalData() {

    const restoredData = JSON.parse(this.originalDataBackup);

    restoredData.BadMessageStartDate = restoredData.BadMessageStartDate ? new Date(restoredData.BadMessageStartDate) : null;

    Object.assign(this.burialProcessData, restoredData);

  }

  //endregion
}
