import {Injectable, Injector} from '@angular/core';
import {BaseService} from "../../../../core/abstract/base-service";
import {Deceased} from "../model/deceased";

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
}
