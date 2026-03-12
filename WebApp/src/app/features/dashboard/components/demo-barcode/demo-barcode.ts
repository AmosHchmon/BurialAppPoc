import {
  CommonModule
} from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ZXingScannerModule
} from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-demo-barcode',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule],
  templateUrl: './demo-barcode.html',
  styleUrl: './demo-barcode.scss',
})
export class DemoBarcode implements OnInit {

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

  ngOnInit(): void {
    // if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.BarcodeDetector) {
    //   alert("Your device does not support the Barcode Detection API. Try again on Chrome Desktop or Android");
    // } else {
    //    //this.startDetection();
    // }
    // כאן תבוא הלוגיקה שתתבצע בעת אתחול הקומפוננטה
  }

  // async startDetection() {
  //   //we start the device's camera
  //   let video = document.getElementById('barcode-detection-video') as HTMLVideoElement;;
  //   let stream = await navigator.mediaDevices.getUserMedia({
  //     video: {
  //       facingMode: "environment"
  //     }
  //   });
  //   video.srcObject = stream;
  //   video.play();

  //   //for the purpose of this demo, we're only detecting QR codes, but there are plenty of other barcodes formats we could detect
  //   //see https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API#supported_barcode_formats
  //   let barcodeDetector = new BarcodeDetector({
  //     formats: ["qr_code", "code_128"]
  //   });

  //   video.addEventListener('loadedmetadata', async function () {
  //     let canvas = document.createElement('canvas');
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     let context = canvas.getContext('2d');

  //     let checkForQrCode = async function () {
  //       //we draw the current view from the camera on a canvas
  //       context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //       //then we pass that canvas to the barcode detector
  //       let barcodes = await barcodeDetector.detect(canvas);

  //       if (barcodes.length > 0) {
  //         let barcodeData = barcodes[0].rawValue;
  //         alert("Detected QR code with the following content: " + barcodeData);
  //       };

  //       requestAnimationFrame(checkForQrCode);
  //     };

  //     checkForQrCode();
  //   });
  // }

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

}
