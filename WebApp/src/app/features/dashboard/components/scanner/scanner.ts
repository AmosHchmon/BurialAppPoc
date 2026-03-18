import {
  CommonModule
} from '@angular/common';
import {
  Component,
  inject,
  OnInit
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
// import { SelectedDeceasedBug } from '../dialogs/selected-deceased-bug/selected-deceased-bug';

@Component({
  selector: 'app-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule, MatDialogModule,MatIconModule],
  templateUrl: './scanner.html',
  styleUrl: './scanner.scss',
})
export class ScannerComponent implements OnInit {

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject < boolean > (false);
  tryHarder = true;

  dialog = inject(MatDialog);

  ngOnInit(): void {
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  onConfirmSelection(): void {
    this.dialog.open(SelectedDeceasedBug);
  }

}
