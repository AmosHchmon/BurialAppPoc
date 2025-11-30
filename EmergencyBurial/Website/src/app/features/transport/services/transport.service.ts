import {Injectable, Injector} from '@angular/core';

import {BaseService} from "../../../core/abstract/base-service";
import {Transport} from "../model/transport";

@Injectable({
  providedIn: 'root'
})
export class TransportService extends BaseService {

  constructor(protected injector: Injector) {
    super("TransportsService", injector);
  }

  async getTransportsByDeceasedId(id: string): Promise<Transport[]> {

    return super.get({path: `/deceased/${id}`});
  }

  async createTransport(transport: Transport): Promise<Transport> {

    return super.post({body: transport});
  }
}
