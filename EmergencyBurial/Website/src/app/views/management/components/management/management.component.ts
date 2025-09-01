import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Ripple} from "primeng/ripple";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {HeaderComponent} from "../../../../layout/components/header/header.component";

@Component({
  selector: 'app-management',
  imports: [UiComponentsModule, HeaderComponent, Ripple],
  templateUrl: './management.component.html',
  styleUrl: './management.component.scss'
})
export class ManagementComponent {

  visible: boolean = false;

}
