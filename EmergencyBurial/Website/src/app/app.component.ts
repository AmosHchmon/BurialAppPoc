import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgHttpLoaderComponent} from 'ng-http-loader';
import {Toast} from "primeng/toast";
import {ConfirmDialog} from "primeng/confirmdialog";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NgHttpLoaderComponent, Toast, ConfirmDialog],
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {

  title = 'Burial';

  constructor() {
  }
}
