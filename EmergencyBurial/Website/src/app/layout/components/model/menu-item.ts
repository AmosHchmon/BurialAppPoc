import { FormType } from '../../../core/enums/form-type.enum';

export interface IMenuItem{

  Id?: string | null;

  Text?: string;

  MenuItems: IMenuItem[];

  IsCollapse: boolean;

  FormType?: FormType;

  FormPath?: string;
}
