export interface TarahBag{

  BagNumber: string;

  CurrentTransportId?: number;

  PartDescription?: string;

  BagProcessStatus?: number;

  BagProcessStatusDesc?: string;

  BurialLicenseFileId?: string;

  TransportHistory?: TarahBagHistory[];
}

export interface TarahBagHistory {

  TransportId: number;

  StartDate: Date;

  Destination: string;

  IsCompleted?: boolean;
}

