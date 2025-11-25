import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, afterNextRender, Injector} from '@angular/core';
import {ConfirmationService} from "primeng/api";

import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {DeceasedBurialCoordination} from "../../model/DeceasedBurialCoordination";
import {IOptionItem} from "../../../../shared/model/list-item";
import {DialogMessage} from "../../../../shared/static/messages";

@Component({
  selector: 'app-burial-coordination-form',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  templateUrl: './burial-coordination-form.component.html',
  styleUrl: './burial-coordination-form.component.scss'
})
export class BurialCoordinationFormComponent implements OnInit, OnChanges {

  @Input('data') data: DeceasedBurialCoordination;
  @Input('isEdit') isEdit: boolean = false;
  @Output() saveCoordination = new EventEmitter<DeceasedBurialCoordination>();
  @Output() editModeChange = new EventEmitter<boolean>();
  @ViewChild('burialCityInput') burialCityInputRef: ElementRef<HTMLInputElement>;

  private originalDataBackup: string;

  burialBody: IOptionItem[];

  constructor(private listService: ListService, private confirmService: ConfirmationService, private injector: Injector) {
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

      afterNextRender(() => {

        this.burialCityInputRef?.nativeElement.focus();
      }, { injector: this.injector });

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

        this.restoreOriginalData();

        this.editModeChange.emit(false);
      },
      reject: () => {
        return;
      }

    })
  }

  private convertDates(data: DeceasedBurialCoordination) {

    if (!data) {
      return data;
    }

    return {
      ...data,
      BurialTime: data.BurialTime ? new Date(data.BurialTime) : null,
      BadMessageDeliveredDateTime: data.BadMessageDeliveredDateTime ? new Date(data.BadMessageDeliveredDateTime) : null
    };
  }

  restoreOriginalData() {

    const restoredData = JSON.parse(this.originalDataBackup);

    this.data = this.convertDates(this.data);

    Object.assign(this.data, restoredData);

  }
}
