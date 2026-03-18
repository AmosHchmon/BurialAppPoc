// מודל החלל (Deceased)
export interface Deceased {
  id: string; // Guid מה-C# הופך ל-string ב-TS
  identityNumber?: string;
  firstName: string;
  lastName: string;
  fatherName?: string;
}

// מודל השק (Bag)
export interface Bag {
  deceasedId: string;
  bagNumber: string;
  partDescription?: string;
}
