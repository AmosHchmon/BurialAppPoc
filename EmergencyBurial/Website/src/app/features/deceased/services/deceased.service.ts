import {Injectable, Injector} from '@angular/core';

import {Deceased} from "../model/Deceased";
import {BaseService} from "../../../core/abstract/base-service";
import {DeceasedBurialCoordination} from "../model/DeceasedBurialCoordination";
import {DeceasedBurialProcessStatus} from "../model/DeceasedBurialProcessStatus";
import {DeceasedBurialDetails} from "../model/DeceasedBurialDetails";

@Injectable({
  providedIn: 'root'
})
export class DeceasedService extends BaseService {

  constructor(protected injector: Injector) {
    super("DeceasedService", injector);
  }

  async getDeceaseds(): Promise<Deceased[]> {
    return super.get({path: '/'});
  }

  async getDeceasedById(id: string): Promise<Deceased> {
    return super.get({path: `/${id}`});
  }

  async getBurialDetails(id: string): Promise<DeceasedBurialDetails> {
    return super.get({path: `/burial-details/${id}`});
  }

  updateBurialCoordination(coordinationData: DeceasedBurialCoordination): Promise<DeceasedBurialCoordination> {
    return super.put({path: '/burial-coordination', body: coordinationData});
  }

  updateBurialProcess(burialProcess: DeceasedBurialProcessStatus): Promise<DeceasedBurialProcessStatus> {
    return super.put({path: '/burial-process', body: burialProcess});
  }

  getDeceasedBurialCoordination(id: string): Promise<DeceasedBurialCoordination> {
    return super.get({path: `/burial-coordination/${id}`});
  }

  getDeceasedBurialProcessStatus(id: string): Promise<DeceasedBurialProcessStatus> {
    return super.get({path: `/burial-process/${id}`});
  }
}
