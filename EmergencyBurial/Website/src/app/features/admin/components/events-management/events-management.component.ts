import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AlertService} from "../../../../shared/services/alert.service";
import {AdminEventService} from "../../services/admin-event.service";
import {IEvent} from "../../model/Event";
import {ValidationModule} from "../../../../shared/validation/validation.module";
import {BaseManagementComponent} from "../../../../core/abstract/base-management";

@Component({
  selector: 'app-events-management',
  standalone: true,
  imports: [UiComponentsModule, ValidationModule],
  templateUrl: './events-management.component.html',
  styleUrl: './events-management.component.scss'
})
export class EventsManagementComponent extends BaseManagementComponent<IEvent> implements OnInit {

  @ViewChild('eventForm') eventForm: NgForm;

  eventsColumns: IColumn[] = [
    {field: 'Name', header: 'שם האירוע'},
    {field: 'IsExercise', header: 'סוג אירוע'},
  ];

  constructor(
    private adminEventService: AdminEventService,
    private alertService: AlertService,
  ) {
    super();
  }

  async ngOnInit() {
    await this.loadEvents();
  }

  private async loadEvents() {

    this.items = await this.adminEventService.getEvents();
  }

  onAddEvent() {

    const defaultEvent = {
      Name: '',
      IsExercise: true
    };

    if (this.eventForm) {
      this.eventForm.resetForm(defaultEvent);
    }

    this.initNewItem(defaultEvent);
  }

  onEditEvent() {

    if (this.dt.selection) {
      this.initEditItem(this.dt.selection);
    }
  }

  async onSaveEvent() {

    if (this.currentItem.Id) {

      await this.adminEventService.updateEvent(this.currentItem);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemUpdateSuccessfully});

      const index = this.items.findIndex(e => e.Id === this.currentItem.Id);

      if (index !== -1) {
        this.items[index] = {...this.currentItem};
        this.items = [...this.items];
      }

    } else {

      const createdEvent = await this.adminEventService.saveEvent(this.currentItem);

      if (createdEvent) {
        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});
        this.items = [createdEvent, ...this.items];
      }
    }

    this.closeDialog();
  }
}
