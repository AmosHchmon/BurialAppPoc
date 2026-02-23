import {TransportPurpose} from "../../../shared/enum/transport-purpose.enum";
import {enmStationType} from "../../../shared/enum/station-type.enum";

export interface CreateTransport {

  StartDateTime?: Date;

  SourceLocationType?: enmStationType;

  SourceStationId?: number;

  StartLocationNameFreeText?: string;

  DestinationLocationType?: TransportPurpose;

  DestinationStationId?: number;

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
