import { Message } from "./Message";
export interface CommentSection {
  docID?: string;
  tripID: string;
  messages: Message[];
}