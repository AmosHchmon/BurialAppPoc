import {DeceasedProcessStatus} from "../../../shared/enum/deceased-process-status.enum";

export interface TaharahList {

  Id?: string;

  IdentityNumber?: string;

  FullName?: string;

  FatherName?: string;

  DeceasedProcessStatus: DeceasedProcessStatus;

  DeceasedProcessStatusDesc?: string;

  BagNumbersDisplay?: string;

  RelatedBagNumbers?: number;
}
