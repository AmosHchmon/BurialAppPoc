import {enmOrganizationType} from "../../../shared/enum/organization-type.enum";
import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";
import {enmStationType} from "../../../shared/enum/station-type.enum";

export interface UpdateTransport {

  Id?: number;

  StartDateTime?: Date;

  StartLocationType?: enmStationType;

  StartStationId?: number;

  StartLocationNameFreeText?: string;

  Purpose?: TransportPurpose;

  EndStationId?: number;

  IsCompleted?: boolean;

  Organization?: string;

  VehicleType?: string;

  LicensePlate?: string;

  DriverFirstName?: string;

  DriverLastName?: string;

  DriverIdentityNumber?: string;

  DriverPhone?: string;

  BagNumbers?: string[];

  DeceasedIds?: string[];
}
