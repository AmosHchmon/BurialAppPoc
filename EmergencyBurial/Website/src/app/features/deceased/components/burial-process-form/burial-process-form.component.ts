import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {ListService} from "../../../../shared/services/list.service";
import {BurialProcessStatus} from "../../model/BurialProcessStatus";
import {IOptionItem} from "../../../../shared/model/list-item";
import {ConvertTimezoneDirective} from "../../../../core/directives/convert-timezone.directive";

@Component({
  selector: 'app-burial-process-form',
  imports: [UiComponentsModule, ConvertTimezoneDirective],
  templateUrl: './burial-process-form.component.html',
  styleUrl: './burial-process-form.component.scss'
})
export class BurialProcessFormComponent implements OnInit, OnChanges {

  @Input('data') data: BurialProcessStatus;
  @Output() saveBurialProcess = new EventEmitter<BurialProcessStatus>();

  private originalDataBackup: string;

  identificationStatus: IOptionItem[];
  badMessageProcessStatus: IOptionItem[];
  collectionStatus: IOptionItem[];
  burialStatus: IOptionItem[];
  isEdit: boolean = false;

  constructor(private listService: ListService) {
  }

  async ngOnInit() {

    this.data.BadMessageStartDate = this.data.BadMessageStartDate ? new Date(this.data.BadMessageStartDate) : null;

    await this.loadLists();
  }

  ngOnChanges() {

    if (this.data) {
      this.data.BadMessageStartDate = this.data.BadMessageStartDate ? new Date(this.data.BadMessageStartDate) : null;
    }
  }

  private async loadLists() {

    this.badMessageProcessStatus = await this.listService.getBadMessageProcessStatus();
    this.identificationStatus = await this.listService.getIdentificationStatus();
    this.collectionStatus = await this.listService.getCollectionStatus();
    this.burialStatus = await this.listService.getBurialStatus();
  }

  toggleEdit() {

    if (!this.isEdit) {

      this.originalDataBackup = JSON.stringify(this.data);
    }

    this.isEdit = !this.isEdit;
  }

  async onSaveBurialProcess() {

    this.saveBurialProcess.emit(this.data);

    this.isEdit = false;
  }

  cancelEdit() {

    const restoredData = JSON.parse(this.originalDataBackup);

    restoredData.BadMessageStartDate = restoredData.BadMessageStartDate ? new Date(restoredData.BadMessageStartDate) : null;

    Object.assign(this.data, restoredData);

    this.isEdit = false;
  }
}
