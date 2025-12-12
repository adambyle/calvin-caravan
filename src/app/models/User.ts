import { Trip } from "./Trip";
export interface User {
  docID?: string;
  displayName: string;
  email: string;
  password: string;
  favoriteTrips?: string[]; //  for the three following arrays, each string referes to a trip's document ID
  signedUp?: string[];
  ownedTrips?: string[];
}