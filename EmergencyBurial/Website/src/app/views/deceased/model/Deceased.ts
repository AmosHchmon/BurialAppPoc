import {DeceasedBurialCoordination} from "./DeceasedBurialCoordination";
import {DeceasedOperational} from "./DeceasedOperational";
import {DeceasedBagDetails} from "./DeceasedBagDetails";
import {DeceasedBurial} from "./DeceasedBurial";

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

  DeceasedOperational?: DeceasedOperational;

  DeceasedBagDetails?: DeceasedBagDetails;

  DeceasedBurial?: DeceasedBurial;

  DeceasedBurialCoordination?: DeceasedBurialCoordination;

}
