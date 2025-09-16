import {DeceasedBurialCoordination} from "./DeceasedBurialCoordination";
import {DeceasedOperational} from "./DeceasedOperational";
import {DeceasedBagDetails} from "./DeceasedBagDetails";
import {DeceasedBurial} from "./DeceasedBurial";
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

  PoliceCaseNumber?: string;

  Notes?: string;

  CreatedOn?: Date;

  BagDetails?: DeceasedBagDetails;

  OperationalDetails?: DeceasedOperational;

  BurialDetails?: DeceasedBurial;

  BurialCoordination?: DeceasedBurialCoordination;

  Transports?: Transport[];

}
