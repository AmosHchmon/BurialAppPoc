import {IOptionItem} from "../model/list-item";

export enum BadMessageProcessStatus {
  NotDelivered = 0,
  Delivered = 1,
}

export enum CollectionStatus {
  NotCollected = 0,
  Collected = 1,
}

export enum IdentificationStatus {
  NotIdentified = 0,
  Identified = 1,
}

export const BadMessageProcessOptions: IOptionItem[] = [
  {Value: IdentificationStatus.Identified, Text: "זוהה"},
  {Value: IdentificationStatus.NotIdentified, Text: "לא זוהה"}];

export const CollectionStatusOptions: IOptionItem[] = [
  {Value: BadMessageProcessStatus.Delivered, Text: "הודעה נמסרה"},
  {Value: BadMessageProcessStatus.NotDelivered, Text: "הודעה לא נמסרה"}];

export const IdentificationStatusOptions: IOptionItem[] = [
  {Value: CollectionStatus.Collected, Text: "נאסף"},
  {Value: CollectionStatus.NotCollected, Text: "לא נאסף"}];
