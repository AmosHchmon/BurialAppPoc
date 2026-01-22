import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UiComponentsModule } from "../../../../shared/ui-components/ui-components.module";
import { TarahService } from "../../services/tarah.service";
import { AlertService } from "../../../../shared/services/alert.service";
import { TarahIntake } from "../../model/TarahIntake";
import { AlertType } from "../../../../core/enums/alert.enum";
import { DialogMessage } from "../../../../shared/static/messages";
import { AuthContextService } from "../../../../shared/services/auth-context.service";

@Component({
    selector: 'app-tarah-intake-dialog',
    standalone: true,
    imports: [UiComponentsModule],
    templateUrl: './tarah-intake-dialog.component.html'
})
export class TarahIntakeDialogComponent {

    @Input() visible: boolean = false;
    @Input() deceasedId: string | undefined;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSaved = new EventEmitter<void>();

    intakeData: TarahIntake = {
        DeceasedId: '',
        TarahReceptionStaff: '',
    };

    constructor(
        private tarahService: TarahService,
        private alertService: AlertService,
        private AuthCtx: AuthContextService
    ) {
    }

    onShow() {

        if (this.deceasedId) {

            this.intakeData = {
                DeceasedId: this.deceasedId,
                TarahReceptionStaff: this.AuthCtx.UserRBAC.FullName,
            };

        }
    }

    closeDialog() {

        this.visible = false;
        this.visibleChange.emit(false);
        this.intakeData = { TarahReceptionStaff: '' };
    }

    async submitIntake() {

        if (!this.intakeData.DeceasedId) {
            return;
        }

        await this.tarahService.receiveDeceased(this.intakeData);

        this.alertService.alert(AlertType.Success, { ClientMessage: DialogMessage.DeceasedReceived });

        this.onSaved.emit();
        this.closeDialog();

    }
}
