import { Trip } from "./Trip";
export interface User {
  docID?: string;
  displayName: string;
  email: string;
  password: string;
  favoriteTrips?: Trip[];
  signedUp?: Trip[];
  ownedTrips?: Trip[];
}