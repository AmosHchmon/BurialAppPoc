import {Transport} from "../../transport/model/transport";

export interface DeceasedBagDetails {

  Id: string;

  DeceasedId: string;

  BagNumber?: string;

  Affiliation?: string;

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
