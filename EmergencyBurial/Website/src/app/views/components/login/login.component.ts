import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Message} from 'primeng/message';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [
    InputText,
    FloatLabel,
    IconField,
    InputIcon,
    ReactiveFormsModule,
    Message,
    ButtonDirective,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  signInForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.signInForm = this.fb.group({

      username: ['', Validators.required],
      mail: ['', [Validators.required]],
    });
  }
}
