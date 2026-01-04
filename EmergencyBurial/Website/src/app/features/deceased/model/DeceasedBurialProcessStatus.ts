export interface DeceasedBurialProcessStatus {

  DeceasedId: string;

  IdentificationStatus?: number;

  BadMessageProcessStatus?: number;

  CollectionStatus?: number;

  BurialStatus?: number;

  IsBadMessageReceived?: boolean;

  IsReleasedFromTarah?: boolean;

  IsBuried?: boolean;

  BurialDate?: Date;

  BadMessageStartDate?: Date;
}
