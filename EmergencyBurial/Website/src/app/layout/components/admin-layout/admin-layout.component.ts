import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {
  SideMenuManageComponent
} from "../side-menu-management/side-menu-management.component";

@Component({
  selector: 'app-side-menu-management-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SideMenuManageComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
