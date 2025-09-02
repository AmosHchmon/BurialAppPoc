export interface DeceasedOperational {

  DeceasedId: string;

  IdentificationStatus: number;

  //Todo: Add all enums after task 1431 is complete
  BadMessageProcessStatus: string;

  CollectionStatus: string;

  BadMessageStartDate: Date;

  BurialProcessStatus: number;
}
