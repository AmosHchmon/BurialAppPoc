import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";
import {enmStationType} from "../../../shared/enum/station-type.enum";

export interface CreateTransport {

  StartDateTime: Date;

  StartLocationType: enmStationType;

  StartStationId?: number;

  StartLocationNameFreeText?: string;

  Purpose: TransportPurpose;

  Destination: TransportPurpose;

  Organization: string;

  VehicleType: string;

  LicensePlate: string;

  DriverFirstName: string;

  DriverLastName: string;

  DriverIdentityNumber: string;

  DriverPhone: string;

  BagNumbers: string[];

  DeceasedIds: string[];
}
