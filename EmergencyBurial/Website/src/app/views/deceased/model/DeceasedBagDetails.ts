export interface DeceasedBagDetails {

  DeceasedId: string;

  Affiliation: number;

  ReceivingStation?: number;

  LastKnownLocation: string;

  PartDescription: string;

  RelatedBagNumbers: string;

  CanBeIdentifiedByAcquaintance: boolean;

  ReceivingNotes: string;

  FillerName: string;

  ArrivalDateTime: Date;

  BroughtBy: number;

  BroughtFrom: string;
}
