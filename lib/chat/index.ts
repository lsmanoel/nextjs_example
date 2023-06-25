export interface OldMessage {
  updatedDate: string;
  text: string;
}
export interface Message {
  id: string;
  created: string;
  name: string;
  email: string;
  text: string;
  oldTexts?: OldMessage[];
  deleted: boolean;
}
