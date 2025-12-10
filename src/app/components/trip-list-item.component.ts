import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/Trip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

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
      <div class="header-actions">
        <button mat-icon-button color="primary" (click)="onFavorite()">
          <mat-icon>star</mat-icon>
        </button>
        <button mat-raised-button color="accent" (click)="onCommit()">
          Commit
        </button>
      </div>
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
    }

    .trip-title:hover {
      color: #1565c0;
    }

    .posted-date {
      margin: 0;
      color: #666;
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
      background-color: #e0e0e0;
      color: #333;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }

    .content-row {
      display: flex;
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
      gap: 24px;
      margin-bottom: 16px;
      color: #666;
      font-size: 13px;
      flex-wrap: wrap;
    }

    .fact-item {
      margin: 0;
      white-space: nowrap;
    }

    .description-box {
      flex: 1;
      padding: 12px;
      background-color: #f5f5f5;
      border-radius: 6px;
      text-align: left;
    }

    .description-box p {
      margin: 0;
      color: #555;
      font-size: 14px;
      line-height: 1.5;
    }
  `]
})
export class TripListItemComponent {
  trip = input<Trip>();

  onFavorite() {
    console.log('Favorite clicked for trip:', this.trip());
  }

  onCommit() {
    console.log('Commit clicked for trip:', this.trip());
  }
}
