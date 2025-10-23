import {DeceasedBagDetails} from "./DeceasedBagDetails";
import {DeceasedOperational} from "./DeceasedOperational";
import {DeceasedBurial} from "./DeceasedBurial";
import {DeceasedBurialCoordination} from "./DeceasedBurialCoordination";
import {IColumn} from "../../../shared/ui-components/model/column";

export interface DeceasedAccordion{

  object:DeceasedBagDetails |
    DeceasedOperational |
    DeceasedBurial |
    DeceasedBurialCoordination;

  title: string;

  fields: IColumn[];

  splitIndex: number;

  trackNumber: number;

}
