import {TarahBag} from "./TarahBag";

export interface TarahProcess {

  DeceasedId?: string;

  FullName?: string;

  IdentityNumber?: string;

  FatherName?: string;

  IsIdentified?: boolean;

  Gender?: string;

  Affiliation?: number;

  BurialLicenseScanned?: boolean;

  TeamManager?: string;

  IntermediateStorage?: string;

  IsPendingExit?: boolean;

  PendingExitReason?: string;

  IsPopulationRegistryUpdated?: boolean;

  Bags: TarahBag[];
}
