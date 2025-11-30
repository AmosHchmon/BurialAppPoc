import {DeceasedBagDetails} from "./DeceasedBagDetails";
import {IColumn} from "../../../shared/ui-components/model/column";
import {Deceased} from "./Deceased";
import {DeceasedBurialDetails} from "./DeceasedBurialDetails";

export interface DeceasedStaticFields {

  object: Deceased | DeceasedBagDetails | DeceasedBurialDetails

  title: string;

  fields: IColumn[];

  splitIndex: number;

  trackNumber: number;

}
