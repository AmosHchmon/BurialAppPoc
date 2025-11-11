import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmationService} from "primeng/api";

import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {BurialCoordination} from "../../model/BurialCoordination";
import {IOptionItem} from "../../../../shared/model/list-item";
import {DialogMessage} from "../../../../shared/static/messages";

@Component({
  selector: 'app-burial-coordination-form',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  templateUrl: './burial-coordination-form.component.html',
  styleUrl: './burial-coordination-form.component.scss'
})
export class BurialCoordinationFormComponent implements OnInit, OnChanges {

  @Input('data') data: BurialCoordination;
  @Input('isEdit') isEdit: boolean = false;
  @Output() saveCoordination = new EventEmitter<BurialCoordination>();
  @Output() editModeChange = new EventEmitter<boolean>();
  @ViewChild('burialCityInput') burialCityInputRef: ElementRef<HTMLInputElement>;

  private originalDataBackup: string;

  burialBody: IOptionItem[];

  constructor(private listService: ListService, private confirmService: ConfirmationService) {
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

    this.editModeChange.emit(!this.isEdit);
  }

  async onSaveCoordination() {

    this.saveCoordination.emit(this.data);

  }

  cancelEdit() {

    this.confirmService.confirm({
      header: DialogMessage.Cancel,
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: async () => {

        const restoredData = JSON.parse(this.originalDataBackup);

        this.data = this.convertDates(restoredData);

        Object.assign(this.data, restoredData);

        this.editModeChange.emit(false);
      },
      reject: () => {
        return;
      }

    })
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
