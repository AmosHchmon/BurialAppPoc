import {BurialCoordination} from "./BurialCoordination";
import {DeceasedProcessStatus} from "./DeceasedProcessStatus";
import {BagDetails} from "./BagDetails";
import {BurialDetails} from "./BurialDetails";
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

  BagDetails?: BagDetails;

  DeceasedProcessStatus?: DeceasedProcessStatus;

  BurialDetails?: BurialDetails;

  BurialCoordination?: BurialCoordination;

  Transports?: Transport[];

}
