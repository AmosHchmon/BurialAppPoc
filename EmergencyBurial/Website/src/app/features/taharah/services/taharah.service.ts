import {Injectable, Injector} from '@angular/core';

import {BaseService} from "../../../core/abstract/base-service";
import {TaharahList} from "../model/TaharahList";
import {TaharahProcess} from "../model/TaharahProcess";
import {TaharahIntake} from "../model/TaharahIntake";

@Injectable({
  providedIn: 'root'
})
export class TaharahService extends BaseService {

  constructor(protected injector: Injector) {
    super("TaharahsService", injector);
  }

  async getPendingList(): Promise<TaharahList[]> {
    return super.get({path: `/pending`});
  }

  async getActiveList(): Promise<TaharahList[]> {
    return super.get({path: `/active`});
  }

  async getReleasedList(): Promise<TaharahList[]> {
    return super.get({path: `/released`});
  }

  async getDetailsForEdit(id: string): Promise<TaharahProcess> {
    return super.get({path: `/details/${id}`});
  }

  async receiveDeceased(dto: TaharahIntake): Promise<any> {
    return super.put({path: `/receive`, body: dto});
  }

  async updateDeceasedDetails(dto: TaharahProcess): Promise<any> {
    return super.put({path: `/update-details`, body: dto});
  }

  async releaseFromTaharah(dto: TaharahProcess): Promise<any> {
    return super.post({path: `/release`, body: dto});
  }

}
