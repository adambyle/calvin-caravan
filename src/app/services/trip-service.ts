import { Injectable, inject } from '@angular/core';
import { Timestamp, Firestore, collection, query, collectionData, orderBy, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  firestore: Firestore = inject(Firestore);

  public trips$: Observable<Trip[]>;

  constructor() {
    const chatCollection = collection(this.firestore, 'Trips');
    const q = query(chatCollection, orderBy('postedDate'));
    this.trips$ = collectionData(q, { idField: 'docID' }) as Observable<Trip[]>;
  }

  submitNewTrip = async (ownerID: string, title: string, tags: string[], requirements: string, startDate: Timestamp, 
    endDate: Timestamp, price: number, maxCapacity: number, currentCapacity: number, description: string,
    primaryLocation: string, relatedLinks: string[], headerImage: string, meetingInfo: string, status: string, visibility: boolean) => {
    const tripData: Trip = {
      owner_id: ownerID,
      title: title,
      tags: tags,
      requirements: requirements,
      startDate: startDate,
      endDate: endDate,
      postedDate: Timestamp.now(),
      price: price,
      maxCapacity: maxCapacity,
      currentCapacity: currentCapacity,
      description: description,
      primaryLocation: primaryLocation,
      relatedLinks: relatedLinks,
      headerImage: headerImage,
      meetingInfo: meetingInfo,
      status: status,
      visibility: visibility
    };
    await addDoc(collection(this.firestore, 'Trips'), tripData);
  }

  deleteTrip = async (docID: string) => {
    await deleteDoc(doc(this.firestore, 'Trips', docID));
  };
}

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
