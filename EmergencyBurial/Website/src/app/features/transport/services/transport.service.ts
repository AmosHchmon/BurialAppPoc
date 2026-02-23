import {Injectable, Injector} from '@angular/core';
import {HttpParams} from "@angular/common/http";

import {BaseService} from "../../../core/abstract/base-service";
import {TransportList} from "../model/TransportList";
import {CreateTransport} from "../model/CreateTransport";
import {UpdateTransport} from "../model/UpdateTransport";
import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";
import {DeceasedBag} from "../../deceased/model/DeceasedBag";
import {BagSelectItem} from "../model/BagSelectItem";
import {DeceasedSelectItem} from "../model/DeceasedSelectItem";

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

  async getTransportById(id: number): Promise<UpdateTransport> {
    return super.get({path: `/${id}`});
  }

  async createTransport(dto: CreateTransport): Promise<void> {
    return super.post({path: ``, body: dto});
  }

  async updateTransport(dto: UpdateTransport): Promise<void> {
    return super.put({path: `/update-transport`, body: dto});
  }

  async endTransport(id: number): Promise<void> {
    return super.put({path: `/end/${id}`});
  }

  async getAvailableBags(stationId: number): Promise<BagSelectItem[]> {
    return super.get({path: `/available-bags/${stationId}`});
  }

  async getAvailableDeceaseds(stationId: number): Promise<DeceasedSelectItem[]> {
    return super.get({path: `/available-deceaseds/${stationId}`});
  }
}
