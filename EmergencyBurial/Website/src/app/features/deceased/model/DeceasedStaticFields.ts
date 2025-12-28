import {DeceasedBag} from "./DeceasedBag";
import {IColumn} from "../../../shared/ui-components/model/column";
import {Deceased} from "./Deceased";
import {DeceasedBurialDetails} from "./DeceasedBurialDetails";

export interface DeceasedStaticFields {

  object: Deceased | DeceasedBag | DeceasedBurialDetails

  title: string;

  fields: IColumn[];

  splitIndex: number;

  trackNumber: number;

}
