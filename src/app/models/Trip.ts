// TODO update this with a true TRIP model
export interface Trip {
  id: string;
  title?: string;
  origin?: string;
  destination?: string;
  startDate?: string;  // ISO string or similar
  endDate?: string;  // ISO string or similar
  tags: string[];
}