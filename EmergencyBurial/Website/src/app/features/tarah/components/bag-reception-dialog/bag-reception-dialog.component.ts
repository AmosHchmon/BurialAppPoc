import {Component, EventEmitter, Input, Output} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {TarahService} from "../../services/tarah.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {TarahProcess} from "../../model/TarahProcess";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {TaharahIntake} from "../../../taharah/model/TaharahIntake";
import {TarahIntake} from "../../model/TarahIntake";

@Component({
  selector: 'app-bag-reception-dialog',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './bag-reception-dialog.component.html'
})
export class BagReceptionDialogComponent {

  @Input() visible: boolean = false;
  @Input() data: TarahProcess | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  get isIdentified(): boolean {
    return !!(this.data?.IdentityNumber && this.data.IdentityNumber.trim().length > 0);
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

    if (!this.data)
      return;

    const receiveData: TarahIntake = {
      BagNumber: this.data.BagNumber
    }
    await this.tarahService.receiveBag(receiveData);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.BagReceived});

    this.onSaved.emit();
    this.closeDialog();
  }
}
