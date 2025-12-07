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
      <div class="trip-content">
        
        <!-- Left: Trip details -->
        <div class="trip-info">
          <h3 class="trip-title">{{ trip()?.title || 'Untitled Trip' }}</h3>
          <p class="trip-route">
            {{ trip()?.origin || 'Unknown' }} → {{ trip()?.destination || 'Unknown' }}
          </p>
          <div class="trip-date">
            <div>
            Start Date: {{ trip()?.startDate | date:'mediumDate' }}
            </div>
            <div>
            End Date: {{ trip()?.endDate | date:'mediumDate' }}
          </div>
          </div>
        </div>

        <!-- Right: Action buttons -->
        <div class="actions">
          <button mat-icon-button color="primary" (click)="onFavorite()">
            <mat-icon>star</mat-icon>
          </button>

          <button mat-raised-button color="accent" (click)="onCommit()">
            Commit
          </button>
        </div>
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

    .trip-title {
      margin: 0;
      font-weight: 600;
      font-size: 18px;
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
