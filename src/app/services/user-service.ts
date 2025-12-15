import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);

  public users$: Observable<User[]>;

  constructor() {
    const chatCollection = collection(this.firestore, 'users');
    const q = query(chatCollection);
    this.users$ = collectionData(q, { idField: 'docID' }) as Observable<User[]>;
  }

  submitNewUser = async (displayName: string, email: string, password: string) => {
    const userData: User = {
      displayName: displayName,
      email: email,
      password: password,
      favoriteTrips: [],
      signedUp: [],
      ownedTrips: []
    };
    await addDoc(collection(this.firestore, 'users'), userData);
  }

  deleteUser = async (docID: string) => {
    await deleteDoc(doc(this.firestore, 'users', docID));
  };

  updateUser = async (docID: string, userData: Partial<User>) => {
    await updateDoc(doc(this.firestore, 'users', docID), userData);
  }
}
