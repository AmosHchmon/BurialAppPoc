import {Injectable, Injector} from '@angular/core';
import {HttpParams} from "@angular/common/http";

import {BaseService} from "../../../core/abstract/base-service";
import {TransportList} from "../model/TransportList";
import {CreateTransport} from "../model/CreateTransport";
import {UpdateTransportDetails} from "../model/UpdateTransportDetails";
import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";
import {DeceasedBag} from "../../deceased/model/DeceasedBag";
import {BagSelectItem} from "../model/BagSelectItem";

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

  async availableBags(): Promise<BagSelectItem[]> {

    return super.get({path: `/available-bags`});
  }

  async createTransport(dto: CreateTransport): Promise<void> {
    return super.post({path: ``, body: dto});
  }

  async updateDetails(dto: UpdateTransportDetails): Promise<void> {
    return super.put({path: `/update-details`, body: dto});
  }

  async endTransport(id: number): Promise<void> {
    return super.put({path: `/end/${id}`});
  }
}
