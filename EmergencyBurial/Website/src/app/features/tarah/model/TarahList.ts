export interface TarahList {

  Id: string;

  IdentityNumber: string;

  FullName: string;

  FatherName: string;

  ProcessStatusDesc: string;

  BagNumbersDisplay: string;

  RelatedBagNumbers: number;

  TarahStatus?: number;

  TarahStatusDesc: string;

  Bags: TarahBagHistory[];
}

export interface TarahBagHistory {

  BagNumber: string;

  CurrentTransportId?: number;

  Transports: TransportHistory[];
}

export interface TransportHistory {

  TransportId: number;

  StartDate: Date;

  Destination: string;

  IsCompleted: boolean;
}
