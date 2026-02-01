import {Transport} from "../../transport/model/transport";

export interface DeceasedBag {

  Id?: string;

  DeceasedId?: string;

  BagNumber?: string;

  ReceivingStation?: string;

  LastKnownLocation?: string;

  PartDescription?: string;

  RelatedBagNumbers?: number;

  CanBeIdentifiedByAcquaintance?: string;

  ReceivingNotes?: string;

  FillerName?: string;

  ArrivalDateTime?: Date;

  BroughtBy?: string;

  BroughtFrom?: string;

  ObjectsOnDeceased?: string;

  Transports?: Transport[];
}
