import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {TaharahService} from "../../services/taharah.service";
import {ListService} from "../../../../shared/services/list.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {TaharahProcess} from "../../model/TaharahProcess";
import {IOptionItem} from "../../../../shared/model/list-item";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-taharah-update-dialog',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './taharah-update-dialog.component.html'
})
export class TaharahUpdateDialogComponent implements OnChanges {

  @Input() visible: boolean = false;
  @Input() deceasedId: string | undefined;
  @Input() isReleasedMode: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  processData: TaharahProcess | null = null;
  taharahLocations: IOptionItem[] = [];

  constructor(
    private taharahService: TaharahService,
    private listService: ListService,
    private alertService: AlertService,
    private confirmService: ConfirmationService
  ) {
  }

  async ngOnChanges(changes: SimpleChanges) {

    if (changes['visible'] && this.visible && this.deceasedId) {
      await this.loadData();
    }
  }

  async loadData() {

    if (!this.deceasedId) {
      return;
    }

    this.taharahLocations = await this.listService.getTaharahLocations();

    this.processData = await this.taharahService.getDetailsForEdit(this.deceasedId);

    if (this.processData) {

      this.processData.TaharahProcessStartDate = this.processData.TaharahProcessStartDate ??
        new Date(this.processData.TaharahProcessStartDate);

      this.processData.TaharahClosingDate = this.processData.TaharahClosingDate ??
        new Date(this.processData.TaharahClosingDate);

    }
  }

  closeDialog() {

    this.visible = false;
    this.visibleChange.emit(false);
    this.processData = null;
  }

  async submitUpdate() {

    if (!this.processData) {
      return;
    }

    await this.taharahService.updateDeceasedDetails(this.processData);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.DeceasedUpdated});

    this.onSaved.emit();

    this.closeDialog();
  }

  async onRelease() {

    if (!this.processData?.DeceasedId) {
      return;
    }

    this.confirmService.confirm({
      header: DialogMessage.ReleaseFromTaharah,
      message: DialogMessage.ShouldReleaseFromTaharah,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: async () => {

        await this.taharahService.releaseFromTaharah(this.processData);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.DeceasedReleasedFromTaharah});

        this.onSaved.emit();
        this.closeDialog();
      },
      reject: () => {
        return;
      }

    })

  }
}
