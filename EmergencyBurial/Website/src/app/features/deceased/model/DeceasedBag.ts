import {Transport} from "../../transport/model/transport";

export interface DeceasedBag {

  Id?: string;

  DeceasedId?: string;

  BagNumber?: string;

  PartDescription?: string;

  CanBeIdentifiedByAcquaintance?: string;

  ObjectsOnDeceased?: string;

  Transports?: Transport[];
}
