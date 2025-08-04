import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgHttpLoaderComponent} from 'ng-http-loader';
import {Toast} from "primeng/toast";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NgHttpLoaderComponent, Toast],
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {
  title = 'Burial';
}
