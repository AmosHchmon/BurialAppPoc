import {Component} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";

@Component({
  selector: 'app-transport',
  imports: [UiComponentsModule],
  templateUrl: './transport.component.html',
  styleUrl: './transport.component.scss',
  standalone: true,
})
export class TransportComponent {

}
