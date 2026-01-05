import {Component, EventEmitter, Input, Output} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {TaharahService} from "../../services/taharah.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {TaharahIntake} from "../../model/TaharahIntake";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AuthContextService} from "../../../../shared/services/auth-context.service";

@Component({
  selector: 'app-taharah-intake-dialog',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './taharah-intake-dialog.component.html'
})
export class TaharahIntakeDialogComponent {

  @Input() visible: boolean = false;
  @Input() deceasedId: string | undefined;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  intakeData: TaharahIntake = {
    DeceasedId: '',
    TaharahReceptionStaff: '',
  };

  constructor(
    private taharahService: TaharahService,
    private alertService: AlertService,
    private AuthCtx: AuthContextService
  ) {
  }

  onShow() {

    if (this.deceasedId) {

      this.intakeData = {
        DeceasedId: this.deceasedId,
        TaharahReceptionStaff: this.AuthCtx.UserRBAC.FullName,
      };

    }
  }

  closeDialog() {

    this.visible = false;
    this.visibleChange.emit(false);
    this.intakeData = {TaharahReceptionStaff: ''};
  }

  async submitIntake() {

    if (!this.intakeData.DeceasedId) {
      return;
    }

    await this.taharahService.receiveDeceased(this.intakeData);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.DeceasedReceived});

    this.onSaved.emit();
    this.closeDialog();

  }
}
