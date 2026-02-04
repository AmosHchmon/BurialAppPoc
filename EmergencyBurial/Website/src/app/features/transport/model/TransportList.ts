import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";

export interface TransportList {

  Id?: number;

  StartDateTime?: Date;

  StartLocation?: string;

  Purpose: TransportPurpose;

  PurposeDesc?: string;

  IsCompleted?: boolean;

  BagNumbers?: string[];

  TotalBags?: number;
}
