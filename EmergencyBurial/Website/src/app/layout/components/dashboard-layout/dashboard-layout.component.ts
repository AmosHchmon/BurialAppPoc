import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss'],
    standalone: true,
  imports: [HeaderComponent, RouterModule],
})
export class DashboardLayoutComponent {

}
