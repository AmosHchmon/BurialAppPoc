import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ConfirmationService} from "primeng/api";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {TaharahService} from "../../services/taharah.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {TaharahProcess} from "../../model/TaharahProcess";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";

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
  @Input() showReleaseButton: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  processData: TaharahProcess | null = null;

  constructor(
    private taharahService: TaharahService,
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

    this.processData = await this.taharahService.getDetailsForEdit(this.deceasedId);
  }

  closeDialog() {

    this.visible = false;
    this.visibleChange.emit(false);
    this.processData = null;
  }

  onPendingExitChange() {

    if (this.processData && !this.processData.IsPendingExit) {
      this.processData.PendingExitReason = '';
    }
  }

  async submitUpdate() {

    if (!this.processData) {
      return;
    }

    if (this.processData.InCoffin && !this.processData.CoffinReason) {

      this.alertService.alert(AlertType.Warning, {ClientMessage: DialogMessage.InCoffinReasonRequired});
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

    if (this.processData.InCoffin && !this.processData.CoffinReason) {
      this.alertService.alert(AlertType.Warning, {ClientMessage: DialogMessage.InCoffinReasonRequired});
      return;
    }

    if (!this.processData.HasTachrichim) {
      this.alertService.alert(AlertType.Warning, {ClientMessage: DialogMessage.TachrichimIsRequired});
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
