import {Injectable, Injector} from '@angular/core';

import {BaseService} from "../../../core/abstract/base-service";
import {Deceased} from "../../deceased/model/Deceased";
import {DeceasedBurialDetails} from "../../deceased/model/DeceasedBurialDetails";

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

  async getActiveList(month: number, year: number): Promise<Deceased[]> {

    return super.get({path: `/active/${month}/${year}`});
  }

  async updateDeceasedDetails(burialDetails: DeceasedBurialDetails): Promise<any> {

    return super.put({path: '/update-details', body: burialDetails});
  }

  async receiveDeceased(burialDetails: DeceasedBurialDetails): Promise<any> {

    return super.put({path: '/receive', body: burialDetails});
  }

}
