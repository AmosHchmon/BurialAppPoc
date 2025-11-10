import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';

import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {BurialCoordination} from "../../model/BurialCoordination";
import {IOptionItem} from "../../../../shared/model/list-item";

@Component({
  selector: 'app-burial-coordination-form',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  templateUrl: './burial-coordination-form.component.html',
  styleUrl: './burial-coordination-form.component.scss'
})
export class BurialCoordinationFormComponent implements OnInit, OnChanges {

  @Input('data') data: BurialCoordination;
  @Output() saveCoordination = new EventEmitter<BurialCoordination>();
  @ViewChild('burialCityInput') burialCityInputRef: ElementRef<HTMLInputElement>;

  private originalDataBackup: string;

  burialBody: IOptionItem[];
  isEdit: boolean = false;

  constructor(private listService: ListService) {
  }

  async ngOnInit() {

    this.data = this.convertDates(this.data);

    this.burialBody = await this.listService.getBurialBodyList();
  }

  ngOnChanges() {

    if (this.data) {
      this.data = this.convertDates(this.data);
    }
  }

  toggleEdit() {

    if (!this.isEdit) {

      setTimeout(() => {
        this.burialCityInputRef.nativeElement.focus();
      }, 0);

      this.originalDataBackup = JSON.stringify(this.data);
    }

    this.isEdit = !this.isEdit;
  }

  async onSaveCoordination() {

    this.saveCoordination.emit(this.data);

    this.isEdit = false;
  }

  cancelEdit() {

    const restoredData = JSON.parse(this.originalDataBackup);

    this.data = this.convertDates(restoredData);

    Object.assign(this.data, restoredData);

    this.isEdit = false;
  }

  private convertDates(data: BurialCoordination) {

    if (!data) {
      return data;
    }

    return {
      ...data,
      BurialTime: data.BurialTime ? new Date(data.BurialTime) : null,
      BadMessageDeliveredDateTime: data.BadMessageDeliveredDateTime ? new Date(data.BadMessageDeliveredDateTime) : null
    };
  }
}
