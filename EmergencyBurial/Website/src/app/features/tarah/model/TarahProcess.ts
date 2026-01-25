export interface TarahBag {
  Id: string;
  BagNumber: string;
  PartDescription: string;
  BagProcessStatus: number;
  BurialLicenseFileId?: string;
}

export interface TarahProcess {
  DeceasedId?: string;
  FullName?: string;
  IdentityNumber?: string;
  FatherName?: string;
  Gender?: string;
  Affiliation?: number;
  TarahTeamManager?: string;
  IntermediateStorage?: string;
  IsPendingExit?: boolean;
  PendingExitReason?: string;
  IsTarahPerformed?: boolean;
  Bags?: TarahBag[];
  BurialLicenseScanned?: boolean;
  IsPopulationRegistryUpdated?: boolean;
}
