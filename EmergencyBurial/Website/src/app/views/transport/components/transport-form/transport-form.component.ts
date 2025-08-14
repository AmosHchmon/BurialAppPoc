import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {DatePicker} from "primeng/datepicker";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../model/transport";
import {TransportService} from "../../services/transport.service";
import {AutoFocus} from "primeng/autofocus";

@Component({
  selector: 'app-transport-form',
  imports: [
    FloatLabel,
    InputText,
    UiComponentsModule,
    DatePicker,
    AutoFocus
  ],
  templateUrl: './transport-form.component.html',
  styleUrl: './transport-form.component.scss'
})
export class TransportFormComponent {

  @Input() deceasedId: number;
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
