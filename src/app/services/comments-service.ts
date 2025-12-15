import { Injectable, inject } from '@angular/core';
import { Timestamp, Firestore, collection, collectionData, query, addDoc, deleteDoc, doc, setDoc, orderBy } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Message } from '../models/Message';
import { CommentSection } from '../models/CommentSection';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  public comnt$: Observable<CommentSection[]>;

  constructor(private firestore: Firestore) {
    const commentCollection = collection(this.firestore, 'conversations');
    const q = query(commentCollection);

    // Fetch comment sections and their messages
    this.comnt$ = collectionData(q, { idField: 'docID' }).pipe(
      switchMap((commentSections) => {
        // Map each commentSection to include its messages
        const commentSectionsWithMessages$ = commentSections.map((section) => {
          const messageCollection = collection(this.firestore, `conversations/${section.docID}/messages`);
          const mq = query(messageCollection, orderBy('timestamp'));

          // Fetch messages for this commentSection
          return collectionData(mq, { idField: 'docID' }).pipe(
            map((messages) => ({
              ...section,
              messages: messages as Message[], // Attach messages to the section
            }))
          );
        });

        // Combine all observables into one
        return combineLatest(commentSectionsWithMessages$);
      })
    ) as Observable<CommentSection[]>;
  }

  submitNewMessage = async (message: string, userID: string, convoID: string) => {
    const messageData: Message = {
      user_id: userID,
      message: message,
      timestamp: Timestamp.now()
    };
    await addDoc(collection(this.firestore, `conversations/${convoID}/messages`), messageData);
  };

  deleteMessage = async (docID: string, convoID: string) => {
    await deleteDoc(doc(this.firestore, `conversations/${convoID}/messages`, docID));
  };

  createCommentSection = async (tripID: string) => {
    await setDoc(doc(this.firestore, 'conversations', tripID), { trip_id: tripID });
  };
}