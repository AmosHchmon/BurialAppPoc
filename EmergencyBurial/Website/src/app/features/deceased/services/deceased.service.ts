import {Injectable, Injector} from '@angular/core';

import {Deceased} from "../model/Deceased";
import {BaseService} from "../../../core/abstract/base-service";
import {BurialCoordination} from "../model/BurialCoordination";

@Injectable({
  providedIn: 'root'
})
export class DeceasedService extends BaseService {

  constructor(protected injector: Injector) {
    super("DeceasedsService", injector);
  }

  async getDeceaseds(): Promise<Deceased[]> {
    return super.get({path: '/'});
  }

  async getDeceasedById(id: string): Promise<Deceased> {
    return super.get({path: `/${id}`});
  }

  async saveDeceased(deceased: Deceased): Promise<Deceased> {
    return super.post({body: deceased});
  }

  async updateDeceased(deceased: Deceased): Promise<Deceased> {
    return super.put({body: deceased});
  }

  deleteDeceased(id: number): Promise<Deceased> {
    return super.delete({path: `/${id}`});
  }

  updateBurialCoordination(coordinationData: BurialCoordination) {

    return super.put({path: '/burial-coordination', body: coordinationData});
  }
}
