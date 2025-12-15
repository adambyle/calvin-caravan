import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Trip } from '../../models/Trip';
import { User } from '../../models/User';
import { TripService } from '../../services/trip-service';
import { UserService } from '../../services/user-service';
import { CommentsService } from '../../services/comments-service';
import { Message } from '../../models/Message';
import { CommentSection } from '../../models/CommentSection';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon class="icon-theme">arrow_back</mat-icon>
      </button>
      <span>Calvin Caravan</span>
      <span class="spacer"></span>
      @if (!currentUserId) {
        <button mat-icon-button routerLink="/signin">
          <mat-icon class="icon-theme">account_circle</mat-icon>
        </button>
      } @else {
        <button mat-icon-button routerLink="/my-account">
          <mat-icon class="icon-theme">account_circle</mat-icon>
        </button>    
      }
    </mat-toolbar>

    <div class="container">
      @if (trip) {
        <mat-card>
          <div class="detail-header-row">
            <div class="detail-header-main">
              <div class="title-tags-row">
                <mat-card-title>{{ trip.title }}</mat-card-title>
                <div class="tags-row">
                  @for (tag of trip.tags; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
                  <span class="trip-status"> {{ trip.status }}</span>
              </div>
              <mat-card-subtitle>
                <span class="trip-field-location">
                  <mat-icon class="location-icon icon-theme" inline>location_on</mat-icon>
                    {{ trip.primaryLocation }}
                </span>
                <span class="trip-field-price"> {{ trip.price | currency:'USD':'symbol':'1.2-2' }}</span>
              </mat-card-subtitle>
            </div>
            <button mat-icon-button (click)="onFavorite()" [ngClass]="{ 'favorite-active': isFavorite() }">
              <mat-icon class="icon-theme">star</mat-icon>
            </button>
            <button mat-raised-button color="accent" (click)="onCommit()" [ngClass]="{ 'commit-active': isCommitted() }" class="mat-raised-button-theme">
              @if (isCommitted()) {
                Committed!
              } @else {
                Commit
              }
            </button>
          </div>
          <mat-card-content>
            <div class="trip-details">
              @if (trip.headerImage) {
                <img [src]="trip.headerImage" alt="Trip Image" class="trip-image" />
              }
              <div class="trip-fields">
                <div class="trip-field-row">
                  <div class="trip-field short"><strong>Owner:</strong> {{ owner?.displayName }}</div>
                  <div class="trip-field short"><strong>Start:</strong> {{ trip.startDate.toDate() | date:'mediumDate' }}</div>
                  <div class="trip-field short"><strong>End:</strong> {{ trip.endDate.toDate() | date:'mediumDate' }}</div>
                  <div class="trip-field short"><strong>Posted:</strong> {{ trip.postedDate.toDate() | date:'mediumDate' }}</div>
                  <div class="trip-field short"><strong>Capacity:</strong> {{ trip.currentCapacity }}/{{ trip.maxCapacity }}</div>
                </div>
                <div class="trip-field-recs"><strong>Requirements:</strong> {{ trip.requirements }}</div>
              </div>
            </div>
            <div class="trip-long-fields">
              <div class="trip-field"><strong>Meeting Info:</strong> {{ trip.meetingInfo }}</div>
              <div class="trip-field"><strong>Description:</strong> <span class="description">{{ trip.description }}</span></div>
              <div class="trip-field"><strong>Related Links:</strong>
                <ul class="related-links">
                  @for (link of trip.relatedLinks; track link) {
                    <li>
                      <a [href]="link" target="_blank">{{ link }}</a>
                    </li>
                    }
                </ul>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <p>Loading trip details...</p>
      }
      <div class="comment-section">
        <h3>Discussion</h3>
        @if (commentSection?.messages?.length) {
          @for (message of commentSection?.messages; track message.docID) {
            <div class="message">
              <div>
                <strong>{{ getUserName(message.user_id) }}</strong>: {{ message.message }}
                <small>{{ message.timestamp.toDate() | date:'short' }}</small>
              </div>
              <div>
              @if (message.user_id === currentUserId) {
                  <button mat-icon-button color="warn" (click)="deleteMessage(message)">
                    <mat-icon class="icon-theme">delete</mat-icon>
                  </button>
                }
              </div>
            </div>
          }
        } @else {
          <p>No messages yet.</p>
        }
      </div>
      @if (currentUserId) {
        <div class="message-input">
          <mat-form-field appearance="outline" class="full-width form-field-theme">
            <mat-label>Add a comment</mat-label>
            <textarea matInput [(ngModel)]="newMessage" name="newMessage" rows="2"></textarea>
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="sendMessage()" class="mat-raised-button-theme">Send</button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #4e121bff;
      color: #f3cd01;
      font-family: 'Segoe UI', Arial, sans-serif;
      min-height: 100vh;
    }

    .spacer {
      flex: 1 1 auto;
    }

    mat-toolbar {
      background-color: #8c2131;
      color: #ffffff;
    }

    mat-toolbar button,
    mat-toolbar button mat-icon,
    mat-toolbar span {
      color: #ffffff;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: #661924ff;
    }
    mat-card {
      margin-bottom: 24px;
      position: relative;
      background-color: #8c2131;
      color: #ffffff;
    }
    .detail-header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      padding: 8px 8px 0 8px;
    }
    .detail-header-main {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
    }
    .title-tags-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .trip-details {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 8px 0 0 0;
    }
    .trip-image {
      max-width: 300px;
      max-height: 240px;
      border-radius: 8px;
      margin-bottom: 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      flex-shrink: 0;
    }
    .trip-fields {
      flex: 1;
      min-width: 220px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .trip-field-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 16px;
      margin-bottom: 6px;
    }
    .trip-field {
      font-size: 15px;
      color: #ffffff;
      background: #661924ff;
      border-radius: 4px;
      padding: 6px 10px;
      margin-bottom: 2px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      display: block;
    }
    .trip-field-recs {
      font-size: 15px;
      color: #ffffff;
      background: #661924ff;
      border-radius: 4px;
      padding: 6px 10px;
      margin-bottom: 2px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      display: block;
    }
    .trip-field-price {
      display: inline-block;
      color: #f3cd01;
      font-weight: 700;
      font-size: 16px;
      margin-right: 10px;
      border-radius: 4px;
      padding: 4px 12px 4px 10px;
      min-width: 100px;
      vertical-align: top;
    }
    .trip-field-location {
      display: inline-flex;
      align-items: center;
      color: #ffffff;
      font-weight: 500;
      font-size: 15px;
      padding: 4px 10px 4px 8px;
      border-radius: 4px;
      min-width: 120px;
    }
    .location-icon {
      font-size: 20px;
      margin-right: 6px;
      color: #f3cd01;
      vertical-align: middle;
      position: relative;
      top: 1px;
    }
    .trip-field.short {
      min-width: 120px;
      max-width: 180px;
      display: inline-block;
      background: #661924ff;
      color: #ffffff;
      font-size: 14px;
      padding: 4px 8px;
      margin-right: 4px;
    }
    .trip-long-fields {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
      align-items: flex-start;
    }
    .trip-status {
      display: inline-block;
      background-color: #f3cd01;
      color: #8c2131;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
    }
    .tag {
      display: inline-block;
      background-color: #f3cd01;
      color: #8c2131;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
    }
    .description {
      display: block;
      margin-top: 4px;
      color: #ffffff;
      font-size: 15px;
      font-style: italic;
    }
    .related-links {
      margin: 0;
      padding-left: 18px;
    }
    .related-links li {
      margin-bottom: 4px;
    }
    .comment-section {
      border: 1px solid #8c2131;
      padding: 20px;
      margin: 16px 0;
      border-radius: 4px;
      background-color: #8c2131;
      color: #ffffff;
    }
    .message {
      display: flex;
      align-items: flex-start;
      gap: 2.5rem;
      margin-bottom: 10px;
      padding: 8px;
      background-color: #661924ff;
      color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      position: relative;
    }
    .message small {
      display: block;
      color: #f3cd01;
      font-size: 12px;
      margin-top: 4px;
    }
    .message button {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    .message-input {
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .message-input button {
      align-self: flex-start;
    }
    
    .favorite-active mat-icon {
      color: #f3cd01;
    }

    .commit-active {
      background-color: #f3cd01 !important;
      color: #8c2131 !important;
    }

  @media (max-width: 600px) {
  .title-tags-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
  `]
})
export class TripDetailsComponent implements OnInit {
  trip: Trip | null = null;
  owner: User | null = null;
  commentSection: CommentSection | null = null;
  users: User[] = [];
  currentUserId: string | null = null;
  newMessage: string = '';
  currentUser = signal<User | null>(null);
  isFavorite = signal<boolean>(false);
  isCommitted = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private userService: UserService,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('currentUserId');
    // Get the docID from the route parameters
    this.route.paramMap.subscribe(params => {
      const docID = params.get('docID');
      if (docID) {
        // Subscribe to trips and find the one matching the docID
        this.tripService.trips$.subscribe(trips => {
          this.trip = trips.find(t => t.docID === docID) || null;
          if (this.trip) {
            // Subscribe to comments
            this.commentsService.comnt$.subscribe(sections => {
              this.commentSection = sections.find(s => s.trip_id === this.trip!.docID) || null;
            });
            this.updateSignals();
          }
        });
      }
    });
    this.userService.users$.subscribe(users => {
      this.users = users;
      this.owner = users.find(u => u.docID === this.trip?.owner_id) || null;
      const user = users.find(u => u.docID === this.currentUserId);
      if (user) {
        this.currentUser.set(user);
      }
      this.updateSignals();
    })
  }

  updateSignals() {
    const user = this.currentUser();
    if (user && this.trip) {
      if (user.favoriteTrips?.some(trip => trip == this.trip!.docID)) {
        this.isFavorite.set(true);
      } else {
        this.isFavorite.set(false);
      }
      if (user.signedUp?.some(trip => trip == this.trip!.docID)) {
        this.isCommitted.set(true);
      } else {
        this.isCommitted.set(false);
      }
    }
  }

  getUserName(userId: string): string {
    const user = this.users.find(u => u.docID === userId);
    return user ? user.displayName : userId;
  }

  async sendMessage() {
    if (this.newMessage.trim() && this.commentSection && this.currentUserId) {
      await this.commentsService.submitNewMessage(this.newMessage, this.currentUserId, this.commentSection.docID!);
      this.newMessage = '';
    }
  }

  async deleteMessage(message: Message) {
    if (this.commentSection) {
      await this.commentsService.deleteMessage(message.docID!, this.commentSection.docID!);
    }
  }

  onFavorite() {
    const user = this.currentUser();
    if (!user || !this.trip) {
      return;
    }

    const newIsFavorite = !this.isFavorite();
    this.isFavorite.set(newIsFavorite);

    const favorites = user.favoriteTrips ?? [];

    if (newIsFavorite) {
      this.userService.updateUser(user.docID!, {
        favoriteTrips: [...favorites, this.trip.docID!],
      });
    } else {
      this.userService.updateUser(user.docID!, {
        favoriteTrips: favorites.filter(t => t !== this.trip!.docID),
      });
    }
  }

  onCommit() {
    const user = this.currentUser();
    if (!user || !this.trip) {
      return;
    }

    const newIsCommitted = !this.isCommitted();
    this.isCommitted.set(newIsCommitted);

    const signedUp = user.signedUp ?? [];

    if (newIsCommitted) {
      this.userService.updateUser(user.docID!, {
        signedUp: [...signedUp, this.trip.docID!],
      });
    } else {
      this.userService.updateUser(user.docID!, {
        signedUp: signedUp.filter(t => t !== this.trip!.docID),
      });
    }
  }
}