import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {IUserOtp} from "../../shared/model/user-otp";
import {AuthService} from "../../shared/services/auth.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  public user: IUserOtp = {UserName: '', Mail: '', PhoneNumber: '', OtpNumber: '', IsSmsMethod: false};

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private router: Router) {

    this.authService = authService;
    this.alertService = alertService;
  }

  async onLogin() {

    try {

      await this.authService.login(this.user);

      this.router.navigate(['/dashboard/home']);

    } catch (error) {
      this.alertService.error(error);
    }
  }

  async onTest() {

    try {

      await this.authService.test();

    } catch (error) {
      this.alertService.error(error);
    }

  }
}
