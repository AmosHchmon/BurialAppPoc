// מודל החלל (Deceased)
export interface Deceased {
  id: string; // Guid מה-C# הופך ל-string ב-TS
  identityNumber?: string;
  fullName: string;
  fatherName?: string;
}

// מודל השק (Bag)
export interface Bag {
  deceasedId: string;
  bagNumber: string;
  partDescription?: string;
}

export interface DeceasedListItem {
  id?: string;
  fullName?: string; // איחוד של פרטי ומשפחה
  identityNumber?: string;
  bagNumber?: string;
  location?: 'תר"ח' | 'אבו כביר' | 'הכנה לקבורה';
}
