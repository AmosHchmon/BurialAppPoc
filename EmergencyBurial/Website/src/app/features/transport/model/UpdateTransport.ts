import {enmOrganizationType} from "../../../shared/enum/organization-type.enum";
import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";
import {enmStationType} from "../../../shared/enum/station-type.enum";

export interface UpdateTransport {

  Id?: number;

  StartDateTime?: Date;

  SourceLocationType?: enmStationType;

  SourceStationId?: number;

  StartLocationNameFreeText?: string;

  DestinationLocationType?: TransportPurpose;

  DestinationStationId?: number;

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
