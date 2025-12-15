import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/Trip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user-service';
import { User } from '../models/User';

@Component({
  selector: 'app-trip-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  template: `
<mat-card class="trip-card" appearance="outlined">

  <!-- HEADER -->
  <div class="header-row">
    <div class="header-left">
      <h3 class="trip-title" [routerLink]="['/trip', trip()?.docID]">{{ trip()?.title || 'Untitled Trip' }}</h3>
      <!-- TAGS -->
      <div class="tags-row">
        @for (tag of trip()?.tags; track tag) {
          <span class="tag">{{ tag }}</span>
        }
      </div>
    </div>
    <div class="header-right">
      <p class="posted-date">Posted: {{ trip()?.postedDate?.toDate() | date:'mediumDate' }}</p>
      @if (currentUser()) {
        <div class="header-actions">
          <button
            mat-icon-button
            (click)="onFavorite()"
            [ngClass]="{ 'favorite-active': isFavorite() }"
          >
            <mat-icon>star</mat-icon>
          </button>

          <button
            mat-raised-button
            color="accent"
            (click)="onCommit()"
            [ngClass]="{ 'commit-active': isCommitted() }"
          >
            @if (isCommitted()) {
              Committed!
            } @else {
              Commit
            }
          </button>
        </div>
      }
    </div>
  </div>

  <!-- IMPORTANT FACTS -->
  <div class="facts-row">
    <div class="fact-item"><strong>Location:</strong> {{ trip()?.primaryLocation || 'Unknown' }}</div>
    <div class="fact-item"><strong>Start Date:</strong> {{ trip()?.startDate?.toDate() | date:'mediumDate' }}</div>
    <div class="fact-item"><strong>End Date:</strong> {{ trip()?.endDate?.toDate() | date:'mediumDate' }}</div>
  </div>

  <!-- CONTENT -->
  <div class="content-row">
    <img 
      class="trip-image" 
      [src]="trip()?.headerImage" 
      alt="Trip Image"
    />

    <div class="description-box">
      <p>{{ trip()?.description || 'No description available.' }}</p>
    </div>
  </div>

</mat-card>

  `,
  styles: [`
    .trip-card {
      margin: 12px 0;
      padding: 16px;
      background-color: #8c2131; /* red background container */
      border: 1px solid #8c2131; /* red border */
      color: #ffffff; /* default text white */
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      gap: 16px;
    }

    .header-left {
      flex: 1;
    }

    .header-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }

    .trip-title {
      margin: 0 0 8px 0;
      font-weight: 600;
      font-size: 18px;
      cursor: pointer;
      color: #ffffff;
    }

    .trip-title:hover {
      color: #f3cd01; /* yellow accent on hover */
    }

    .posted-date {
      margin: 0;
      color: #ffffff; /* white generic fact text */
      font-size: 12px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 8px;
    }

    .tag {
      display: inline-block;
      background-color: #f3cd01; /* yellow for tags */
      color: #8c2131; /* red text for contrast */
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }

    .content-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: flex-start;
    }

    .trip-image {
      max-width: 260px;
      max-height: 260px;
      width: 260px;
      object-fit: cover;
      border-radius: 8px;
    }

    .facts-row {
      display: flex;
      flex-direction: row;
      gap: 1.5rem;      /* 24px */
      margin-bottom: 1rem;
      color: #ffffff; /* white generic facts */
      font-size: 13px;
    }

    .fact-item {
      margin: 0;
      white-space: nowrap; /* desktop */
    }

    .description-box {
      flex: 1;
      padding: 12px;
      background-color: #ffffff; /* white content box */
      border-radius: 6px;
      text-align: left;
    }

    .description-box p {
      margin: 0;
      color: #8c2131; /* red body text inside white box */
      font-size: 14px;
      line-height: 1.5;
    }
    
    .favorite-active mat-icon {
      color: #f3cd01; /* yellow for selected favorite */
    }

    .commit-active {
      background-color: #f3cd01; /* yellow for selected/action */
      color: #8c2131; /* red text for contrast */
    }

    @media (max-width: 600px) {
    /* To make the description cut off cleanly on smaller screens */
      .description-box p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
        
      .facts-row {
        flex-direction: column;
        gap: 0.25rem;
      }
    }

    .content-row {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-start;
  }

  `]
})
export class TripListItemComponent implements OnInit {
  trip = input<Trip>();
  currentUser = signal<User | null>(null);
  userService = inject(UserService);
  isFavorite = signal<boolean>(false);
  isCommitted = signal<boolean>(false);

  ngOnInit() {
    // Load current user from localStorage
    const currentUserId = localStorage.getItem('currentUserId');

    if (currentUserId) {
      // Subscribe to users and find the current user
      this.userService.users$.subscribe(users => {
        const user = users.find(u => u.docID === currentUserId);
        if (user) {
          this.currentUser.set(user);
          if (user.favoriteTrips?.some(trip => trip == this.trip()?.docID)) {
            this.isFavorite.set(true);
          } else {
            this.isFavorite.set(false);
          }
          if (user.signedUp?.some(trip => trip == this.trip()?.docID)) {
            this.isCommitted.set(true);
          } else {
            this.isCommitted.set(false);
          }
        }
      });
    }
  }

  onFavorite() {
    const user = this.currentUser();
    if (!user) {
      return;
    }

    const newIsFavorite = !this.isFavorite();
    this.isFavorite.set(newIsFavorite);

    const trip = this.trip()!;
    const favorites = user.favoriteTrips ?? [];

    if (newIsFavorite) {
      this.userService.updateUser(user.docID!, {
        favoriteTrips: [...favorites, trip.docID!],
      });
    } else {
      this.userService.updateUser(user.docID!, {
        favoriteTrips: favorites.filter(t => t !== trip.docID),
      });
    }
  }

  onCommit() {
    const user = this.currentUser();
    if (!user) {
      return;
    }

    const newIsCommitted = !this.isCommitted();
    this.isCommitted.set(newIsCommitted);

    const trip = this.trip()!;
    const signedUp = user.signedUp ?? [];

    if (newIsCommitted) {
      this.userService.updateUser(user.docID!, {
        signedUp: [...signedUp, trip.docID!],
      });
    } else {
      this.userService.updateUser(user.docID!, {
        signedUp: signedUp.filter(t => t !== trip.docID),
      });
    }
  }
}
