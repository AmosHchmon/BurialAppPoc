import {Component, EventEmitter, Input, Output} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../model/transport";
import {TransportService} from "../../services/transport.service";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";

@Component({
  selector: 'app-transport-form',
  imports: [
    UiComponentsModule,
    ConvertTimezoneDirective,
  ],
  templateUrl: './transport-form.component.html',
  styleUrl: './transport-form.component.scss'
})
export class TransportFormComponent {

  @Output() saveTransport = new EventEmitter<Transport>();

  newTransport: Transport = {}

  constructor(private transportService: TransportService) {
  }

  async createTransport() {

    //this.newTransport.DeceasedId = this.deceasedId;

    this.saveTransport.emit(this.newTransport);

    //await this.transportService.createTransport(this.newTransport);

    this.newTransport = {};

  }

}
