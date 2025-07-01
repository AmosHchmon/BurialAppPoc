import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  standalone: true,
  imports: [RouterModule, HeaderComponent],
})
export class DashboardLayoutComponent {

}
