import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {
  SideMenuManageComponent
} from "../../../views/management/components/side-menu-management/side-menu-management.component";

@Component({
  selector: 'app-side-menu-management-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SideMenuManageComponent
  ],
  templateUrl: './management-layout.component.html',
  styleUrl: './management-layout.component.scss'
})
export class ManagementLayoutComponent {

}
