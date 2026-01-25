import {Component, EventEmitter, Input, Output} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {TarahService} from "../../services/tarah.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {TarahBag, TarahProcess} from "../../model/TarahProcess";
import {BagProcessStatus} from "../../../../core/enums/bag-process-status.enum";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {TaharahIntake} from "../../../taharah/model/TaharahIntake";

@Component({
  selector: 'app-bag-reception-dialog',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './bag-reception-dialog.component.html'
})
export class BagReceptionDialogComponent {
  @Input() visible: boolean = false;
  @Input() bag: TarahBag | null = null;
  @Input() deceased: TarahProcess | null = null;
  @Input() deceasedId: string | undefined;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  get isIdentified(): boolean {
    return !!(this.deceased?.IdentityNumber && this.deceased.IdentityNumber.trim().length > 0);
  }

  constructor(
    private tarahService: TarahService,
    private alertService: AlertService
  ) {
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  async submitReception() {

    if (!this.bag || !this.deceasedId)
      return;

    this.bag.BagProcessStatus = BagProcessStatus.InStorage;

    const updateDto: TaharahIntake = {
      DeceasedId: this.deceasedId,
    };

    await this.tarahService.receiveBag(updateDto);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.BagReceived});
    this.onSaved.emit();
    this.closeDialog();
  }
}
