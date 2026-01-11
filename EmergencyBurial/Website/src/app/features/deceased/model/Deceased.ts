import {DeceasedBurialCoordination} from "./DeceasedBurialCoordination";
import {DeceasedBurialProcessStatus} from "./DeceasedBurialProcessStatus";
import {DeceasedBag} from "./DeceasedBag";
import {DeceasedBurialDetails} from "./DeceasedBurialDetails";

export interface Deceased {

  Id?: string;

  IdentityNumber?: string;

  FullName?: string;

  FatherName?: string;

  Gender?: string;

  Nationality?: string;

  HomeCity?: string;

  HomeAddress?: string;

  PeleNumber?: string;

  Notes?: string;

  BagNumbersDisplay?: string;

  RelatedBagNumbers?: number;

  ProcessStatus?: number;

  ProcessStatusDesc?: string;

  CreatedOn?: Date;

  DeceasedBags?: DeceasedBag[];

  DeceasedBurialProcessStatus?: DeceasedBurialProcessStatus;

  DeceasedBurialDetails?: DeceasedBurialDetails;

  DeceasedBurialCoordination?: DeceasedBurialCoordination;
}
