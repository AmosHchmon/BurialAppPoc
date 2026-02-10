import {Component, EventEmitter, Input, Output} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {TarahService} from "../../services/tarah.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {TarahProcess} from "../../model/TarahProcess";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {TarahBag} from "../../model/TarahBag";

@Component({
  selector: 'app-tarah-intake-dialog',
  standalone: true,
  imports: [UiComponentsModule],
  templateUrl: './tarah-intake-dialog.component.html'
})
export class TarahIntakeDialogComponent {

  @Input() visible: boolean = false;
  @Input() data: TarahProcess | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSaved = new EventEmitter<void>();

  selectedBagForHistory: TarahBag | null = null;
  activeTabIndex: number = 0;

  constructor(
    private tarahService: TarahService,
    private alertService: AlertService
  ) {
  }

  closeDialog() {

    this.selectedBagForHistory = null;
    this.visible = false;
    this.activeTabIndex = 0;

    this.visibleChange.emit(false);
  }

  async submitReception() {

    if (!this.data?.DeceasedId)
      return;

    await this.tarahService.receiveBag(this.data.DeceasedId);

    this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.BagReceived});

    this.onSaved.emit();
    this.closeDialog();

  }
}
