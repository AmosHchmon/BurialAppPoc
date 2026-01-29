import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ConfirmationService} from "primeng/api";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {TarahService} from "../../services/tarah.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {TarahProcess} from "../../model/TarahProcess";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AffiliationOptions} from "../../../../shared/enum/affiliation.enum";

@Component({
  selector: 'app-tarah-update-dialog',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './tarah-update-dialog.component.html'
})
export class TarahUpdateDialogComponent implements OnChanges {

  @Input() visible: boolean = false;
  @Input() data: TarahProcess | null = null;
  @Input() isReleasedMode: boolean = false;
  @Input() showReleaseButton: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  processData: TarahProcess | null = null;
  selectedBag: any | null = null;
  affiliationOptions = AffiliationOptions;

  constructor(
    private tarahService: TarahService,
    private alertService: AlertService,
    private confirmService: ConfirmationService
  ) {
  }

  async ngOnChanges(changes: SimpleChanges) {

    if (changes['visible'] && this.visible && this.data) {

      this.processData = {...this.data};

      await this.loadData();
    }
  }

  async loadData() {

    if (!this.data.BagNumber) {
      return;
    }

    /*if (this.processData?.Bags?.length) {
      this.selectedBag = this.processData.Bags[0];
    }*/
  }

  closeDialog() {

    this.visible = false;
    this.visibleChange.emit(false);
    this.processData = null;
    this.selectedBag = null;
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

    await this.tarahService.updateDeceasedDetails(this.processData);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.DeceasedUpdated});

    this.onSaved.emit();

    this.closeDialog();
  }

  async onRelease() {

    if (!this.processData?.DeceasedId) {
      return;
    }

    this.confirmService.confirm({
      header: DialogMessage.ReleaseFromTarah,
      message: DialogMessage.ShouldReleaseFromTarah,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: async () => {

        await this.tarahService.releaseFromTarah(this.processData.BagNumber);

        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.DeceasedReleasedFromTarah});

        this.onSaved.emit();
        this.closeDialog();
      },
      reject: () => {
        return;
      }

    })

  }
}
