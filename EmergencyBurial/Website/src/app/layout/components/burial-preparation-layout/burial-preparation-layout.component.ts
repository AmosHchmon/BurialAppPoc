import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-burial-preparation-layout',
  imports: [
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './burial-preparation-layout.component.html',
  styleUrl: './burial-preparation-layout.component.scss'
})
export class BurialPreparationLayoutComponent {

}
