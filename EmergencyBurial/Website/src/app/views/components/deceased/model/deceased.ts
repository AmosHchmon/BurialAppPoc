export interface Deceased {
  HalalNumber: string;

  IdentityNumber: string;

  FirstName: string;

  LastName: string;

  FatherName?: string;

  Gender?: string;

  Nationality?: string;

  HomeCity?: string;

  HomeAddress?: string;

  CurrentStatusId: number;

  CurrentLocationId: number;

  IsLinkedToOtherCases: boolean;

  BurialCity?: string;

  IsCivilBurial: boolean;

  Notes?: string;

  IsLinkedToOtherCasesValue?: string;

  IsCivilBurialValue?: string

}
