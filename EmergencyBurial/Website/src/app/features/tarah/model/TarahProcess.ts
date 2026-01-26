export interface TarahProcess {

  Id?: string;

  DeceasedId?: string;

  BagNumber?: string;

  FullName?: string;

  IdentityNumber?: string;

  FatherName?: string;

  Gender?: string;

  PartDescription?: string;

  Affiliation?: number;

  TarahTeamManager?: string;

  IntermediateStorage?: string;

  IsPendingExit?: boolean;

  PendingExitReason?: string;

  IsTarahPerformed?: boolean;

  BurialLicenseScanned?: boolean;

  IsPopulationRegistryUpdated?: boolean;
}
