import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Trip } from '../../models/Trip';
import { User } from '../../models/User';
import { TripService } from '../../services/trip-service';
import { UserService } from '../../services/user-service';

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
                  <mat-icon class="location-icon" inline>location_on</mat-icon>
                    {{ trip.primaryLocation }}
                </span>
                <span class="trip-field-price"> {{ trip.price | currency:'USD':'symbol':'1.2-2' }}</span>
              </mat-card-subtitle>
            </div>
            <button mat-icon-button color="primary" class="favorite-btn">
              <mat-icon>favorite_border</mat-icon>
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
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    mat-card {
      margin-bottom: 24px;
      position: relative;
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
    .favorite-btn {
      align-self: flex-start;
      margin-left: auto;
      margin-top: 2px;
      z-index: 2;
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
      color: #333;
      background: #f8f8f8;
      border-radius: 4px;
      padding: 6px 10px;
      margin-bottom: 2px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      display: block;
    }
    .trip-field-recs {
      font-size: 15px;
      color: #333;
      background: #eaf6fb;
      border-radius: 4px;
      padding: 6px 10px;
      margin-bottom: 2px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
      display: block;
    }
    .trip-field-price {
      display: inline-block;
      color: #14532d;
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
      color: #795548;
      font-weight: 500;
      font-size: 15px;
      padding: 4px 10px 4px 8px;
      border-radius: 4px;
      min-width: 120px;
    }
    .location-icon {
      font-size: 20px;
      margin-right: 6px;
      color: #ff9800;
      vertical-align: middle;
      position: relative;
      top: 1px;
    }
    .trip-field.short {
      min-width: 120px;
      max-width: 180px;
      display: inline-block;
      background: #eaf6fb;
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
      background-color: #e0e0e0;
      color: #07b713ff;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
    }
    .tag {
      display: inline-block;
      background-color: #e0e0e0;
      color: #1976d2;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
    }
    .description {
      display: block;
      margin-top: 4px;
      color: #444;
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
    .comment-section-stub {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 16px 0;
      border-radius: 4px;
      background-color: #f5f5f5;
      color: #666;
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

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // Get the docID from the route parameters
    this.route.paramMap.subscribe(params => {
      const docID = params.get('docID');
      if (docID) {
        // Subscribe to trips and find the one matching the docID
        this.tripService.trips$.subscribe(trips => {
          this.trip = trips.find(t => t.docID === docID) || null;
        });
      }
    });
    this.userService.users$.subscribe(users => {
      this.owner = users.find(u => u.docID === this.trip?.owner_id) || null;
    })
  }
}