import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Message} from 'primeng/message';
import {ButtonDirective} from 'primeng/button';
import {IUserOtp} from '../../../shared/model/user-otp';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    InputText,
    IconField,
    InputIcon,
    ReactiveFormsModule,
    Message,
    ButtonDirective,
    FormsModule,
    MatCardContent,
    MatCardHeader,
    MatCard,
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
