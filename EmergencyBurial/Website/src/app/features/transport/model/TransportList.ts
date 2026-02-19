import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";

export interface TransportList {

  Id?: number;

  StartDateTime?: Date;

  SourceLocation?: string;

  SourceStation?: string;

  DestinationLocationType: TransportPurpose;

  DestinationLocation?: string;

  DestinationStation?: string;

  IsCompleted?: boolean;

  BagNumbers?: string;
}
