import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {ButtonDirective} from 'primeng/button';
import {IUserOtp} from '../../../shared/model/user-otp';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {FloatLabel} from 'primeng/floatlabel';
import {AlertService} from "../../../shared/services/alert.service";
import {TokenResponse} from "../../../shared/model/token-response";
import {AuthService} from "../../../shared/services/auth.service";
import {AuthContextService} from "../../../shared/services/auth-context.service";

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    InputGroup,
    InputGroupAddon,
    FloatLabel,
    InputText,
    Message,
    ButtonDirective,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  public user: IUserOtp = {UserName: '', Mail: '', PhoneNumber: '', OtpNumber: '', IsSmsMethod: false};

  constructor(private authService: AuthService,
              private alertService: AlertService,
              private authCtx: AuthContextService,) {

    this.authService = authService;
    this.alertService = alertService;
  }

  async onLogin() {

    try {

      const token: TokenResponse = await this.authService.login(this.user);

      this.authCtx.Token = token.Token;

    } catch (error) {
      this.alertService.error(error);
    }
  }
}
