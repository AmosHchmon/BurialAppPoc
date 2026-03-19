import {
  CommonModule
} from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {
  ZXingScannerModule
} from '@zxing/ngx-scanner';
import {
  BarcodeFormat
} from '@zxing/library';
import {
  BehaviorSubject
} from 'rxjs';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import { SelectedDeceasedBug } from '../dialogs/selected-deceased-bug/selected-deceased-bug';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule, MatDialogModule,MatIconModule],
  templateUrl: './scanner.html',
  styleUrl: './scanner.scss',
})
export class ScannerComponent implements OnInit,OnDestroy {

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.UPC_A,
  ];

  hasDevices: boolean;
  private scanTimer: any;

  qrResultString: string;
noCameraMode = signal<boolean>(false);

  torchAvailable$ = new BehaviorSubject < boolean > (false);
  tryHarder = true;


  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,public router : Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.stopScanTimer();
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  startScanTimer() {
    this.stopScanTimer(); // ניקוי טיימר קודם אם היה

    this.scanTimer = setTimeout(() => {
      this.handleScanTimeout();
    }, 15000); // 15 שניות
  }

  // פונקציה לעצירת הטיימר
  stopScanTimer() {
    if (this.scanTimer) {
      clearTimeout(this.scanTimer);
    }
  }

  // מה קורה אחרי 15 שניות ללא הצלחה
  handleScanTimeout() {

   this.snackBar.open('לא זוהה ברקוד. עובר להזנה ידנית לנוחיותך.', 'סגור', { duration: 3000 });

    this.noCameraMode.set(true);

  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    if (this.hasDevices) {
      this.startScanTimer();
    }
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.stopScanTimer();
  }

  onConfirmSelection(): void {
    this.dialog.open(SelectedDeceasedBug);
  }

  onCamerasNotFound(): void {
   this.noCameraMode.set(true);

   this.snackBar.open('מצלמה לא נמצאה, עובר להזנה ידנית', 'סגור', { duration: 3000 });
  }

    openManualSelection() {
    this.router.navigate(['/manual-selection']);
  }

}
