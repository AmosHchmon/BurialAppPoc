import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePickerModule} from "primeng/datepicker";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../model/transport";
import {TransportService} from "../../services/transport.service";
import {AutoFocus} from "primeng/autofocus";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";

@Component({
  selector: 'app-transport-form',
  imports: [
    UiComponentsModule,
    DatePickerModule,
    AutoFocus,
    ConvertTimezoneDirective,
  ],
  templateUrl: './transport-form.component.html',
  styleUrl: './transport-form.component.scss'
})
export class TransportFormComponent {

  @Input() deceasedId: string;
  @Output() transportCreated = new EventEmitter<Transport>();

  newTransport: Transport = {}

  constructor(private transportService: TransportService) {
  }

  async createTransport() {

    this.newTransport.DeceasedId = this.deceasedId;

    await this.transportService.createTransport(this.newTransport);

    this.newTransport = {};

    this.transportCreated.emit();

  }

}
