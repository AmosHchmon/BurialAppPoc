import {Injectable, Injector} from '@angular/core';

import {BaseService} from "../../../core/abstract/base-service";
import {TarahList} from "../model/TarahList";
import {TarahProcess} from "../model/TarahProcess";

@Injectable({
  providedIn: 'root'
})
export class TarahService extends BaseService {

  constructor(protected injector: Injector) {
    super("TarahService", injector);
  }

  async getPendingList(): Promise<TarahList[]> {
    return super.get({path: `/pending`});
  }

  async getActiveList(): Promise<TarahList[]> {
    return super.get({path: `/active`});
  }

  async getReleasedList(): Promise<TarahList[]> {
    return super.get({path: `/released`});
  }

  async getDetailsForEdit(id: string): Promise<TarahProcess> {
    return super.get({path: `/details/${id}`});
  }

  async receiveBag(id: string): Promise<any> {
    return super.put({path: `/receive/${id}`});
  }

  async updateDeceasedDetails(dto: TarahProcess): Promise<any> {
    return super.put({path: `/update-details`, body: dto});
  }

  async releaseFromTarah(deceasedId: string): Promise<any> {
    return super.put({path: `/release/${deceasedId}`});
  }

}
