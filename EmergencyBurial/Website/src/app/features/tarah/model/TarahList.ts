import {DeceasedProcessStatus} from "../../../shared/enum/deceased-process-status.enum";

export interface TarahList {

  Id: string;

  IdentityNumber: string;

  FullName: string;

  FatherName: string;

  IsIdentified: boolean;

  DeceasedProcessStatus: DeceasedProcessStatus;

  DeceasedProcessStatusDesc?: string;

  BagNumbersDisplay: string;

  RelatedBagNumbers: number;
}
