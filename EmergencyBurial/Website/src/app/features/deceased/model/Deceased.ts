import {DeceasedBurialCoordination} from "./DeceasedBurialCoordination";
import {DeceasedBurialProcessStatus} from "./DeceasedBurialProcessStatus";
import {DeceasedBag} from "./DeceasedBag";
import {DeceasedBurialDetails} from "./DeceasedBurialDetails";
import {DeceasedProcessStatus} from "../../../shared/enum/deceased-process-status.enum";

export interface Deceased {

  Id?: string;

  IdentityNumber?: string;

  FirstName?: string;

  LastName?: string;

  FullName?: string;

  FatherName?: string;

  Gender?: string;

  Nationality?: string;

  Affiliation?: string;

  HomeCity?: string;

  HomeAddress?: string;

  PeleNumber?: string;

  Notes?: string;

  BagNumbersDisplay?: string;

  RelatedBagNumbers?: number;

  DeceasedProcessStatus?: DeceasedProcessStatus;

  DeceasedProcessStatusDesc?: string;

  CreatedOn?: Date;

  DeceasedBags?: DeceasedBag[];

  DeceasedBurialProcessStatus?: DeceasedBurialProcessStatus;

  DeceasedBurialDetails?: DeceasedBurialDetails;

  DeceasedBurialCoordination?: DeceasedBurialCoordination;
}
