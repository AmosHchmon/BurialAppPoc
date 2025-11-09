import {BagDetails} from "./BagDetails";
import {IColumn} from "../../../shared/ui-components/model/column";
import {Deceased} from "./Deceased";
import {BurialDetails} from "./BurialDetails";

export interface DeceasedStaticFields {

  object: Deceased | BagDetails | BurialDetails

  title: string;

  fields: IColumn[];

  splitIndex: number;

  trackNumber: number;

}
