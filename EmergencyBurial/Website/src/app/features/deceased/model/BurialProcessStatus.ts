export interface BurialProcessStatus {

  DeceasedId: string;

  IdentificationStatus?: number;

  BadMessageProcessStatus?: number;

  CollectionStatus?: number;

  BurialStatus?: number;

  IsBadMessageReceived?: boolean;

  BadMessageStartDate?: Date;
}
