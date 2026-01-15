import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {IAuthUser} from "../../../../shared/model/user";
import {AuthService} from "../../../../shared/services/auth.service";
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

  public user: IAuthUser = {UserName: '', Mail: '', PhoneNumber: '', Password: '', OtpNumber: ''};

  public isOtpState = false;
  public otpCode: string = '';

  loginMethod: string = 'otp';

  loginOptions: any[] = [
    {label: 'אימייל', value: 'otp', icon: 'pi pi-envelope'},
    {label: 'סיסמה', value: 'password', icon: 'pi pi-lock'}
  ];

  constructor(private authService: AuthService,
              private authCtx: AuthContextService,
              private router: Router) {
  }

  async onLogin() {

    if (this.loginMethod === 'otp') {

      await this.onSendCode();

      this.isOtpState = true;

    } else {

      this.authCtx.UserRBAC = await this.authService.loginWithPassword(this.user);

      this.router.navigate(['/dashboard/home']);
    }

  }

  async verifyOtp() {

    this.authCtx.UserRBAC = await this.authService.login(this.user);

    this.router.navigate(['/dashboard/home']);
  }

  async onSendCode(){

    this.user.OtpNumber = '';
    await this.authService.createOtp(this.user);
  }
}
