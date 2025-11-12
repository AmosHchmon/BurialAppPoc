import {DeceasedBurialCoordination} from "./DeceasedBurialCoordination";
import {DeceasedBurialProcessStatus} from "./DeceasedBurialProcessStatus";
import {DeceasedBagDetails} from "./DeceasedBagDetails";
import {DeceasedBurialDetails} from "./DeceasedBurialDetails";
import {Transport} from "../../transport/model/transport";

export interface Deceased {

  Id?: string;

  HalalNumber?: string;

  IdentityNumber?: string;

  FirstName?: string;

  LastName?: string;

  FatherName?: string;

  Gender?: string;

  Nationality?: string;

  HomeCity?: string;

  HomeAddress?: string;

  PeleNumber?: string;

  Notes?: string;

  CreatedOn?: Date;

  DeceasedBagDetails?: DeceasedBagDetails;

  DeceasedBurialProcessStatus?: DeceasedBurialProcessStatus;

  DeceasedBurialDetails?: DeceasedBurialDetails;

  DeceasedBurialCoordination?: DeceasedBurialCoordination;

  Transports?: Transport[];

}
