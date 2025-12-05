// src/app/pages/post-trip/post-trip.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post-trip',
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
      <span>Calvin Caravan - Post a Trip</span>
      <span class="spacer"></span>
      <button mat-icon-button routerLink="/my-account">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Create/Edit Trip Proposal</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="form-stub">
            <p>Trip form will go here with the following fields:</p>
            <ul>
              <li>Title</li>
              <li>Tag/Category</li>
              <li>Requirements</li>
              <li>Start Date</li>
              <li>End Date</li>
              <li>Price</li>
              <li>Max Capacity</li>
              <li>Description</li>
              <li>Primary Location</li>
              <li>Related Links</li>
              <li>Header Image</li>
              <li>Meeting Info</li>
              <li>Status (proposed/confirmed)</li>
              <li>Comment Section Options</li>
            </ul>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary">Save Trip</button>
          <button mat-button routerLink="/">Cancel</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    .form-stub {
      padding: 16px 0;
    }

    .form-stub ul {
      list-style-type: none;
      padding-left: 0;
    }

    .form-stub li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    mat-card-actions {
      padding: 16px;
      gap: 8px;
      display: flex;
    }
  `]
})
export class PostTripComponent {}
