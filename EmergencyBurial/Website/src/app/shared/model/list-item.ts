export interface IListItem {
  Id?: number;
  Key?: number;
  Text?: string;
  ListTypeId?: number;
  ListItemDepId?: number;
  IsValid?: boolean;
  Description?: string;
}

export interface IOptionItem {
  Value?: number;
  Text?: string;
}

export class ListItem implements IListItem {
  Text?: string;
  Description?: string;
  constructor(public Key?: number, public ListTypeId?: number,public IsValid: boolean = true) {
  }
}


