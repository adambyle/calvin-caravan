// src/app/pages/my-account/my-account.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Calvin Caravan - My Account</span>
      <span class="spacer"></span>
      <button mat-button>
        <mat-icon>logout</mat-icon>
        Sign Out
      </button>
    </mat-toolbar>

    <div class="container">
      <!-- UserProfile Component Stub -->
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>User Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="user-profile-stub">
            <p>UserProfile Component - Editable user information will go here</p>
            <ul>
              <li>Display Name</li>
              <li>Email</li>
              <li>Other profile details</li>
            </ul>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Tabs for Favorite Trips, Signed Up Trips, and Owned Trips -->
      <mat-card>
        <mat-tab-group>
          <mat-tab label="Favorite Trips">
            <div class="tab-content">
              <div class="trip-list-stub">
                <p>List of favorite trips (TripListItem components)</p>
              </div>
            </div>
          </mat-tab>
          <mat-tab label="Signed Up">
            <div class="tab-content">
              <div class="trip-list-stub">
                <p>List of trips marked as signed up (TripListItem components)</p>
              </div>
            </div>
          </mat-tab>
          <mat-tab label="My Trips">
            <div class="tab-content">
              <div class="trip-list-stub">
                <p>List of trips you own with edit buttons (TripListItem components)</p>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
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

    .profile-card {
      margin-bottom: 24px;
    }

    .user-profile-stub,
    .trip-list-stub {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 16px 0;
      border-radius: 4px;
      background-color: #f5f5f5;
      color: #666;
    }

    .user-profile-stub ul {
      list-style-type: none;
      padding-left: 0;
    }

    .user-profile-stub li {
      padding: 8px 0;
      border-bottom: 1px solid #ddd;
    }

    .tab-content {
      padding: 16px 0;
    }
  `]
})
export class MyAccountComponent {}
