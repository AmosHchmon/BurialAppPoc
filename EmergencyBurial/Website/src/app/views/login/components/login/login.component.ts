import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {IUserOtp} from "../../../../shared/model/user-otp";
import {AuthService} from "../../../../shared/services/auth.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {AuthContextService} from "../../../../shared/services/auth-context.service";

@Component({
  selector: 'app-login',
  imports: [UiComponentsModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  public user: IUserOtp = {UserName: '', Mail: '', PhoneNumber: '', OtpNumber: '', IsSmsMethod: false};

  constructor(private authService: AuthService,
              private authCtx: AuthContextService,
              private alertService: AlertService,
              private router: Router) {

    this.authService = authService;
    this.alertService = alertService;
  }

  async onLogin() {

    try {

      this.authCtx.Member = await this.authService.login(this.user);

      this.router.navigate(['/dashboard/home']);

    } catch (error) {
      this.alertService.alert(error);
    }
  }

}
