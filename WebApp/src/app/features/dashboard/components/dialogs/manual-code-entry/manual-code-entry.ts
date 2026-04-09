import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-manual-code-entry',
  imports: [NgOtpInputComponent,MatDialogModule,MatButtonModule],
  templateUrl: './manual-code-entry.html',
  styleUrl: './manual-code-entry.scss',
})
export class ManualCodeEntry {

  currentCode: string = '';

  // הגדרות הרכיב - כאן אנחנו קובעים את סוג המקלדת
  otpConfig = {
    length: 6,
    allowNumbersOnly: true,
    inputStyles: {
    'width': '2rem',
    'height': '2rem',
    'font-size': '1.5rem'
  }
  };

  constructor(
    public dialogRef: MatDialogRef<ManualCodeEntry>,
  ) { }

onCodeChange(code: string) {
    this.currentCode = code;
    // אופציונלי: אישור אוטומטי ברגע שמגיעים ל-6 ספרות
    if (code.length === 6) {
      // this.confirm();
    }
  }

  confirm() {
    this.dialogRef.close(this.currentCode);
  }

}
