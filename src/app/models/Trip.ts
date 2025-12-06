// TODO update this with a true TRIP model
export interface Trip {
  id: string;
  title?: string;
  origin?: string;
  destination?: string;
  date?: string;  // ISO string or similar
}