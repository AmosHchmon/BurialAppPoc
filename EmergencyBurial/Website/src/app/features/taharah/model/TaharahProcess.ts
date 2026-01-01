export interface TaharahProcess {

  DeceasedId?: string;

  FullName?: string;

  IdentityNumber?: string;

  FatherName?: string;

  Gender?: string;

  TaharahTeamManager?: string;

  IntermediateStorage?: string;

  IsPendingExit?: boolean;

  PendingExitReason?: string;

  TaharahProcessStartDate?: Date;

  TaharahClosingDate?: Date;

  IsTaharahPerformed?: boolean;

  TaharahExecutionTime?: Date;

  HasTachrichim?: boolean;

  InCoffin?: boolean;

  CoffinReason?: string;

  BagNumbers?: string[];
}
