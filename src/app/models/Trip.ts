import { Timestamp } from '@angular/fire/firestore';

export interface Trip {
  docID?: string;
  owner_id: string;
  title: string;
  tags: string[];
  requirements: string;
  startDate: Timestamp;
  endDate: Timestamp;
  postedDate: Timestamp;
  price: number;
  maxCapacity: number;
  currentCapacity: number;
  description: string;
  primaryLocation: string;
  relatedLinks: string[];
  headerImage: string;
  meetingInfo: string;
  status: string;
  visibility: boolean;
}
// export interface Trip {
//   id: string;
//   title?: string;
//   origin?: string;
//   destination?: string;
//   startDate?: string;  // ISO string or similar
//   endDate?: string;  // ISO string or similar
//   tags: string[];
// }