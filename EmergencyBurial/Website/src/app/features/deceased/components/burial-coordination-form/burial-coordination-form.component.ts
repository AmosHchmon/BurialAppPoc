import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

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
export class BurialCoordinationFormComponent implements OnInit {

  @Input('data') data: BurialCoordination;
  @Output() saveCoordination = new EventEmitter<BurialCoordination>();
  @ViewChild('burialCityInput') burialCityInputRef: ElementRef<HTMLInputElement>;

  private originalDataBackup: string;

  burialBody: IOptionItem[];
  isEdit: boolean = false;

  constructor(private listService: ListService) {
  }

  async ngOnInit() {

    this.data.BurialTime = this.data.BurialTime ? new Date(this.data.BurialTime) : null;
    this.data.BadMessageDeliveredDateTime = this.data.BadMessageDeliveredDateTime ? new Date(this.data.BadMessageDeliveredDateTime) : null;

    this.burialBody = await this.listService.getBurialBodyList();
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

    restoredData.BurialTime = restoredData.BurialTime ? new Date(restoredData.BurialTime) : null;
    restoredData.BadMessageDeliveredDateTime = restoredData.BadMessageDeliveredDateTime ? new Date(restoredData.BadMessageDeliveredDateTime) : null;

    Object.assign(this.data, restoredData);

    this.isEdit = false;
  }
}
