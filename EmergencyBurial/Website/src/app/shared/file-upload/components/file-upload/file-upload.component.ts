import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IFileResult } from '../../model/file-result.model';
import { FileService } from '../../services/file.service';
import { AlertService } from '../../../services/alert.service';
import * as _ from 'lodash';
import { AppDocumentType } from '../../../enum/document-type.enum';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    standalone: false
})
export class FileUploadComponent implements OnInit {

  @Input('multiple') Multiple: boolean;
  @Input('readonly') ReadOnly: boolean;
  @Input('layout') Layout: string;
  @Input('name') Name: string = "files";
  @Input('title') Title: string;
  @Input('type') Type: AppDocumentType;
  @Input() FileArray: Array<IFileResult>;
  @Output() FileArrayChange: EventEmitter<Array<IFileResult>> = new EventEmitter<Array<IFileResult>>();
  @ViewChild('fileInput') fileInput: ElementRef;

  public get IsExistFile(): boolean {
    return this.FileArray.length > 0;
  }

  constructor(private fileUploadService: FileService,
    private alertService: AlertService,
    private renderer: Renderer2) {
  }

  ngOnInit(): void {

    this.InitModel();

    if (this.Multiple) {
      this.renderer.setAttribute(this.fileInput.nativeElement, 'multiple', 'true');
    }

  }

  onAdd() {

    this.fileInput.nativeElement.click();

  }

  onDelete(fileId?: string) {

    if (fileId == undefined)
      this.FileArray = [];
    else
      _.remove(this.FileArray, (x: IFileResult) => x.FileId == fileId);

    this.FileArrayChange.emit(this.FileArray);
  }

  async onUploadFile(event:Event) {

    try {

      const target = (<HTMLInputElement>event.target);

      let result = await this.fileUploadService.upload(target.files)

      for (var item of result) {
        let file: IFileResult = Object.assign({}, item, { FileType: this.Type });

        this.FileArray.push(file);

        this.FileArrayChange.emit(this.FileArray);
      }

    } catch (e) {

      this.alertService.error(e);

    }

  }

  onDownload(file: IFileResult) {

    this.fileUploadService.download(file.FileId)
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        window.open(url, '_blank');
      })
      .catch((e) => {
        this.alertService.error(e);
      });

  }

  private InitModel() {

    let firstFile = _.first(this.FileArray);

    if (this.FileArray === undefined || firstFile.FileId == null) {
      this.FileArray = [];
    }

    if (firstFile !== undefined) {

      this.Type = firstFile.FileType

    }



  }

}
