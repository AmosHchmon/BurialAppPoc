import {Transport} from "../../transport/model/transport";

export interface DeceasedBag {

  Id?: string;

  DeceasedId?: string;

  BagNumber?: string;

  PartDescription?: string;

  Transports?: Transport[];
}
