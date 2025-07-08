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

  constructor(){
  }
}
