import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  afterNextRender,
  Injector
} from '@angular/core';
import {ConfirmationService} from "primeng/api";

import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";
import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {DeceasedBurialCoordination} from "../../model/DeceasedBurialCoordination";
import {IOptionItem} from "../../../../shared/model/list-item";
import {DialogMessage} from "../../../../shared/static/messages";
import {DeceasedService} from "../../services/deceased.service";
import {AlertType} from "../../../../core/enums/alert.enum";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
  selector: 'app-burial-coordination-form',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  templateUrl: './burial-coordination-form.component.html',
  styleUrl: './burial-coordination-form.component.scss'
})
export class BurialCoordinationFormComponent implements OnInit, OnChanges {

  @Input('isEdit') isEdit: boolean = false;
  @Input('deceasedId') deceasedId: string = '';
  @Output() editModeChange = new EventEmitter<boolean>();
  @ViewChild('burialCityInput') burialCityInputRef: ElementRef<HTMLInputElement>;

  private originalDataBackup: string;
  coordinationData: DeceasedBurialCoordination;

  burialBody: IOptionItem[];

  constructor(private listService: ListService,
              private confirmService: ConfirmationService,
              private deceasedService: DeceasedService,
              private alertService: AlertService,
              private injector: Injector) {
  }

  async ngOnInit() {

    this.coordinationData = await this.deceasedService.getDeceasedBurialCoordination(this.deceasedId);

    this.coordinationData = this.convertDates(this.coordinationData);

    this.burialBody = await this.listService.getBurialBodyList();
  }

  ngOnChanges() {

    if (this.coordinationData) {
      this.coordinationData = this.convertDates(this.coordinationData);
    }
  }

  toggleEdit() {

    if (!this.isEdit) {

      afterNextRender(() => {

        this.burialCityInputRef?.nativeElement.focus();
      }, {injector: this.injector});

      this.originalDataBackup = JSON.stringify(this.coordinationData);
    }

    this.editModeChange.emit(!this.isEdit);
  }

  async onSaveCoordination() {

    const updatedCoordination = await this.deceasedService.updateBurialCoordination(this.coordinationData);

    if (updatedCoordination) {
      this.coordinationData = {...updatedCoordination};

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

      this.editModeChange.emit(false);
    }
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

    this.coordinationData = this.convertDates(this.coordinationData);

    Object.assign(this.coordinationData, restoredData);

  }
}
