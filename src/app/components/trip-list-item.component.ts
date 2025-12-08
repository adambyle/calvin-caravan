import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../models/Trip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trip-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
<mat-card class="trip-card" appearance="outlined">
<mat-card class="trip-card" appearance="outlined">

  <!-- HEADER -->
  <div class="header-row">
      <h3 class="trip-title">{{ trip()?.title || 'Untitled Trip' }}</h3>
      <div class="header-actions">
        <button mat-icon-button color="primary" (click)="onFavorite()">
          <mat-icon>star</mat-icon>
        </button>
        <button mat-raised-button color="accent" (click)="onCommit()">
          Commit
        </button>
      </div>
  </div>

  <!-- CONTENT -->
  <div class="content-row">

    <img 
      class="trip-image" 
      [src]="trip()?.headerImage" 
      alt="Trip Image"
    />

    <div class="description">
      <p>{{ trip()?.description || 'No description available.' }}</p>
    </div>

  </div>

  <!-- IMPORTANT FACTS -->
  <div class="facts-row">
    <div><strong>Location:</strong> {{ trip()?.primaryLocation || 'Unknown' }}</div>
    <div><strong>Start Date:</strong> {{ trip()?.startDate?.toDate() | date:'mediumDate' }}</div>
    <div><strong>End Date:</strong> {{ trip()?.endDate?.toDate() | date:'mediumDate' }}</div>
  </div>

</mat-card>



  `,
  styles: [`
    .trip-card {
      margin: 12px 0;
      padding: 12px;
    }

    .trip-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .trip-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .content-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

    .trip-title {
      margin: 0;
      font-weight: 600;
      font-size: 18px;
    }

    .trip-image {
    max-width: 260px;
    max-height: 260px;
    object-fit: cover;
    border-radius: 8px;
    margin: 6px 0;
  }

    .trip-route, .trip-date {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .actions {
      display: flex;
      gap: 8px;
      align-items: center;
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
