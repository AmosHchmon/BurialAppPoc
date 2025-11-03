import {BagDetails} from "./BagDetails";
import {DeceasedProcessStatus} from "./DeceasedProcessStatus";
import {BurialDetails} from "./BurialDetails";
import {BurialCoordination} from "./BurialCoordination";
import {IColumn} from "../../../shared/ui-components/model/column";

export interface DeceasedAccordion{

  object:BagDetails |
    DeceasedProcessStatus |
    BurialDetails |
    BurialCoordination;

  title: string;

  fields: IColumn[];

  splitIndex: number;

  trackNumber: number;

}
