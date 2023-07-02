import { FieldValue, Timestamp } from "firebase/firestore";

export interface OldMessage {
  updated: FieldValue | number | string;
  text: string;
}
export interface Message {
  id: string;
  created: Timestamp | FieldValue | number | string;
  name: string;
  email: string;
  text: string;
  oldTexts?: OldMessage[];
  deleted: boolean;
}
