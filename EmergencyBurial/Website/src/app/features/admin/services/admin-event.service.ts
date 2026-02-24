import {Injectable, Injector} from '@angular/core';

import {BaseService} from "../../../core/abstract/base-service";
import {IEvent} from "../model/Event";

@Injectable({
  providedIn: 'root'
})
export class AdminEventService extends BaseService {

  constructor(protected injector: Injector) {
    super("AdminEventService", injector);
  }

  async getEvents(): Promise<IEvent[]> {
    return super.get({path: '/'});
  }

  async saveEvent(event: IEvent): Promise<IEvent> {
    return super.post({body: event});
  }

  async updateEvent(event: IEvent): Promise<any> {
    return super.put({body: event});
  }
}
