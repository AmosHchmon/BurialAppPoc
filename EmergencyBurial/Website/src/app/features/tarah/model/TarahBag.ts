export interface TarahBag{

  BagNumber: string;

  CurrentTransportId?: number;

  PartDescription?: string;

  TransportHistory?: TarahBagHistory[];
}

export interface TarahBagHistory {

  TransportId: number;

  StartDate: Date;

  Destination: string;

  IsCompleted?: boolean;
}

