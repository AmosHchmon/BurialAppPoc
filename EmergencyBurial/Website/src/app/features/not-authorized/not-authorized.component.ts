import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UiComponentsModule} from "../../shared/ui-components/ui-components.module";

@Component({
  selector: 'app-not-authorized',
  imports: [UiComponentsModule],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.scss'
})
export class NotAuthorizedComponent {

  constructor(private router: Router) {
  }

  goHome() {
    this.router.navigate(['/dashboard/home']);
  }
}
