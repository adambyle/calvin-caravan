import { Timestamp } from "@angular/fire/firestore";
export interface Message {
  docID?: string;
  message: string;
  user_id: string;
  timestamp: Timestamp;
}