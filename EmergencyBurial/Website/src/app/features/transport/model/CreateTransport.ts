import {enmOrganizationType} from "../../../shared/enum/organization-type.enum";
import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";

export interface CreateTransport {
  BagNumbers: string[];
  StartDateTime: Date;

  StartLocationType: enmOrganizationType;
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
}
