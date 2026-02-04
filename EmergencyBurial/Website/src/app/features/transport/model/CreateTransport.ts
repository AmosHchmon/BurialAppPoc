import {enmOrganizationType} from "../../../shared/enum/organization-type.enum";
import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";

export interface CreateTransport {

  StartLocationType: enmOrganizationType;

  StartLocationNameFreeText?: string;

  Purpose: TransportPurpose;

  Destination: string;

  Organization: string;

  VehicleType: string;

  LicensePlate: string;

  DriverDetails: string;

  BagNumbers: string[];

  StartDateTime?: Date;
}
