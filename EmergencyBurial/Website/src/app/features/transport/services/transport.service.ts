import {Injectable, Injector} from '@angular/core';
import {HttpParams} from "@angular/common/http";

import {BaseService} from "../../../core/abstract/base-service";
import {TransportList} from "../model/TransportList";
import {CreateTransport} from "../model/CreateTransport";
import {UpdateTransportDetails} from "../model/UpdateTransportDetails";
import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";

@Injectable({
  providedIn: 'root'
})
export class TransportService extends BaseService {

  constructor(protected injector: Injector) {
    super("TransportService", injector);
  }

  async getTransports(purpose?: TransportPurpose): Promise<TransportList[]> {

    let params = new HttpParams();

    if (purpose) {
      params = params.set('filterPurpose', purpose.toString());
    }

    return super.get({path: ``}, {params: params});
  }

  async searchAvailableBags(query: string): Promise<string[]> {

    const params = new HttpParams().set('query', query);

    return super.get({path: `/search-bags`}, {params: params});
  }

  async createTransport(dto: CreateTransport): Promise<any> {
    return super.post({path: ``, body: dto});
  }

  async updateDetails(dto: UpdateTransportDetails): Promise<any> {
    return super.put({path: `/update-details`, body: dto});
  }

  async endTransport(id: number): Promise<any> {
    return super.post({path: `/end/${id}`, body: {}});
  }
}
