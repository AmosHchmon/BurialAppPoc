import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {NgForm} from "@angular/forms";

import {UiComponentsModule} from "../../../../shared/ui-components/ui-components.module";
import {IColumn} from "../../../../shared/ui-components/model/column";
import {AlertType} from "../../../../core/enums/alert.enum";
import {DialogMessage} from "../../../../shared/static/messages";
import {AlertService} from "../../../../shared/services/alert.service";
import {EventService} from "../../services/event.service";
import {IEvent} from "../../model/Event";
import {ValidationModule} from "../../../../shared/validation/validation.module";

@Component({
  selector: 'app-events-management',
  standalone: true,
  imports: [UiComponentsModule, ValidationModule],
  templateUrl: './events-management.component.html',
  styleUrl: './events-management.component.scss'
})
export class EventsManagementComponent implements OnInit {

  @ViewChild('dt') dt: Table<IEvent>;
  @ViewChild('eventForm') eventForm: NgForm;

  eventsColumns: IColumn[] = [
    {field: 'Name', header: 'שם האירוע'},
    {field: 'IsExercise', header: 'סוג אירוע'},
  ];

  events: IEvent[] = [];
  newEvent: IEvent = {};
  showEventDialog: boolean = false;
  searchText: string = '';

  constructor(
    private eventService: EventService,
    private alertService: AlertService,
  ) {
  }

  async ngOnInit() {

    await this.loadEvents();
  }

  private async loadEvents() {

    this.events = await this.eventService.getEvents();
  }

  onAddEvent() {

    const defaultEvent = {
      Name: '',
      IsExercise: true
    };

    if (this.eventForm) {
      this.eventForm.resetForm(defaultEvent);
    }

    this.newEvent = defaultEvent;
    this.showEventDialog = true;
  }

  onEditEvent() {

    this.newEvent = {...this.dt.selection};
    this.showEventDialog = true;
  }

  async onSaveEvent() {

    if (this.newEvent.Id) {

      await this.eventService.updateEvent(this.newEvent);

      this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemUpdateSuccessfully});

      const index = this.events.findIndex(e => e.Id === this.newEvent.Id);

      if (index !== -1) {

        this.events[index] = {...this.newEvent};
        this.events = [...this.events];
      }

    } else {

      const createdEvent = await this.eventService.saveEvent(this.newEvent);

      if (createdEvent) {
        this.alertService.alert(AlertType.Success, {ClientMessage: DialogMessage.ItemSavedSuccessfully});

        this.events = [createdEvent, ...this.events];
      }
    }

    this.dt.selection = null;
    this.newEvent = {};

    this.showEventDialog = false;
  }

  clearSearch() {

    this.searchText = '';

    if (this.dt) {
      this.dt.filterGlobal(null, 'contains');
    }
  }
}
