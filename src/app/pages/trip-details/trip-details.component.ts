// src/app/pages/trip-details/trip-details.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Calvin Caravan</span>
      <span class="spacer"></span>
      <button mat-icon-button routerLink="/my-account">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <div class="container">
      <!-- Trip Details Content Stub -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Trip Title Placeholder</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="trip-details-stub">
            <p>Trip details will be displayed here:</p>
            <ul>
              <li>Dates</li>
              <li>Price</li>
              <li>Description</li>
              <li>Requirements</li>
              <li>Itinerary</li>
              <li>Packing List</li>
              <li>Capacity</li>
              <li>External Links</li>
            </ul>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>favorite_border</mat-icon>
            Favorite
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Comment Section Component Stub -->
      <div class="comment-section-stub">
        <h3>Discussion</h3>
        <p>CommentSection Component - Comments and discussion will go here</p>
      </div>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    mat-card {
      margin-bottom: 24px;
    }

    .trip-details-stub {
      padding: 16px 0;
    }

    .trip-details-stub ul {
      list-style-type: none;
      padding-left: 0;
    }

    .trip-details-stub li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    .comment-section-stub {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 16px 0;
      border-radius: 4px;
      background-color: #f5f5f5;
      color: #666;
    }

    mat-card-actions {
      padding: 16px;
    }
  `]
})
export class TripDetailsComponent {}
