export interface TarahBag {
  Id: string;
  BagNumber: string;
  Affiliation: number;
  PartDescription: string;
}

export interface TarahProcess {
  DeceasedId?: string;
  FullName?: string;
  IdentityNumber?: string;
  FatherName?: string;
  Gender?: string;
  TarahTeamManager?: string;
  IntermediateStorage?: string;
  IsPendingExit?: boolean;
  PendingExitReason?: string;
  IsTarahPerformed?: boolean;
  Bags?: TarahBag[];
  BurialLicenseScanned?: boolean;
}
