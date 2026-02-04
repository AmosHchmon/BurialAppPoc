export interface TransportList {

  Id: number;

  StartDateTime: Date;

  ArrivalDateTime?: Date;

  IsCompleted: boolean;

  StartLocation: string;

  PurposeDesc: string;

  Destination: string;

  DriverDetails: string;

  VehicleType: string;

  LicensePlate: string;

  TotalBags: number;

  BagNumbers: string[];
}
