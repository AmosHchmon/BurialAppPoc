export interface TarahList {

  Id: string;

  IdentityNumber: string;

  FullName: string;

  FatherName: string;

  IsIdentified: boolean;

  ProcessStatusDesc: string;

  BagNumbersDisplay: string;

  RelatedBagNumbers: number;

  TarahStatus?: number;

  TarahStatusDesc: string;
}
