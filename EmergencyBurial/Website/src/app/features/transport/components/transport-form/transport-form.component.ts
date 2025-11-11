import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {Transport} from "../../model/transport";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";

@Component({
  selector: 'app-transport-form',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  templateUrl: './transport-form.component.html',
  styleUrl: './transport-form.component.scss'
})
export class TransportFormComponent implements OnInit {

  @Output() saveTransport = new EventEmitter<Transport>();
  @ViewChild('transportForm') transportForm: NgForm;

  newTransport: Transport;

  ngOnInit() {

    this.newTransport = {};
    this.newTransport.StartDateTime = new Date();
  }

  async createTransport() {

    this.saveTransport.emit(this.newTransport);

    this.transportForm.resetForm();

  }

}
