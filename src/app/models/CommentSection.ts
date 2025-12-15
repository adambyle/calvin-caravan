import { Message } from "./Message";
export interface CommentSection {
  docID?: string;
  trip_id: string;
  messages: Message[];
}