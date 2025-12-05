// src/app/pages/homepage/homepage.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Calvin Caravan</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/post-trip">
        <mat-icon>add</mat-icon>
        Post a Trip
      </button>
      <button mat-icon-button routerLink="/my-account">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <div class="container">
      <!-- Top Filter Bar Component Stub -->
      <div class="filter-bar-stub">
        <p>TopFilterBar Component - Filters will go here</p>
      </div>

      <!-- Search Bar Component Stub -->
      <div class="search-bar-stub">
        <p>SearchBar Component - Search functionality will go here</p>
      </div>

      <!-- Trip List -->
      <div class="trip-list">
        <h2>Upcoming Trips</h2>
        <!-- TripListItem Component Stub (repeated) -->
        <div class="trip-item-stub">
          <p>TripListItem Component - Trip details will display here</p>
        </div>
        <div class="trip-item-stub">
          <p>TripListItem Component - Trip details will display here</p>
        </div>
        <div class="trip-item-stub">
          <p>TripListItem Component - Trip details will display here</p>
        </div>
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

    .filter-bar-stub,
    .search-bar-stub,
    .trip-item-stub {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 16px 0;
      border-radius: 4px;
      background-color: #f5f5f5;
      text-align: center;
      color: #666;
    }

    .trip-list h2 {
      margin-top: 32px;
      margin-bottom: 16px;
    }
  `]
})
export class HomepageComponent {}
