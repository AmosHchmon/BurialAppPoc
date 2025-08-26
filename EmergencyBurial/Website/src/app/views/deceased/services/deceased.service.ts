import {Injectable, Injector} from '@angular/core';

import {Deceased} from "../model/Deceased";
import {BaseService} from "../../../core/abstract/base-service";

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

}
