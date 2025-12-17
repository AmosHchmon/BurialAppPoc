import {Injectable, Injector} from '@angular/core';

import {BaseService} from "../../../core/abstract/base-service";
import {Deceased} from "../../deceased/model/Deceased";

@Injectable({
  providedIn: 'root'
})
export class TaharahService extends BaseService {

  constructor(protected injector: Injector) {
    super("TaharahsService", injector);
  }

  async getPendingList(): Promise<Deceased[]> {

    return super.get({path: `/pending`});
  }

  async getHistoryList(month: number, year: number): Promise<Deceased[]> {

    return super.get({path: `/history/${month}/${year}`});
  }

  async updateDeceasedDetails(deceased: Deceased): Promise<any> {

    return super.put({path: `/update-details`});
  }

  async markAsBuried(id: string): Promise<any> {

    return super.post({path: `/mark-as-buried/${id}`});
  }
}
