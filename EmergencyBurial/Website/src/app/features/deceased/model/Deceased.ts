import {DeceasedBurialCoordination} from "./DeceasedBurialCoordination";
import {DeceasedBurialProcessStatus} from "./DeceasedBurialProcessStatus";
import {DeceasedBagDetails} from "./DeceasedBagDetails";
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

  CreatedOn?: Date;

  DeceasedBagDetails?: DeceasedBagDetails[];

  DeceasedBurialProcessStatus?: DeceasedBurialProcessStatus;

  DeceasedBurialDetails?: DeceasedBurialDetails;

  DeceasedBurialCoordination?: DeceasedBurialCoordination;
}
