// src/app/pages/post-trip/post-trip.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Timestamp } from '@angular/fire/firestore';
import { TripService } from '../../services/trip-service';
import { Trip } from '../../models/Trip';

@Component({
  selector: 'app-post-trip',
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
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Calvin Caravan - {{ isEditMode ? 'Edit Trip' : 'Post a Trip' }}</span>
      <span class="spacer"></span>
      <button mat-icon-button routerLink="/my-account">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <div class="container">
      @if (!currentUserId) {
        <mat-card class="signin-prompt">
          <mat-card-content>
            <div class="empty-state">
              <mat-icon>lock</mat-icon>
              <p>Please sign in to post a trip.</p>
              <button mat-raised-button color="primary" routerLink="/signin">
                Sign In
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      } @else {
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ isEditMode ? 'Edit Trip Proposal' : 'Create Trip Proposal' }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form class="trip-form" (ngSubmit)="saveTrip()">
              
              <!-- Title -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Trip Title</mat-label>
                <input matInput [(ngModel)]="tripForm.title" name="title" required />
                <mat-icon matSuffix>title</mat-icon>
              </mat-form-field>

              <!-- Tags -->
              <div class="tag-section">
                <label class="section-label">Tags/Categories</label>
                <div class="tag-chips">
                  @for (tag of availableTags; track tag) {
                    <mat-checkbox 
                      [(ngModel)]="tag.selected" 
                      [name]="'tag-' + tag.name"
                      (change)="updateSelectedTags()"
                    >
                      {{ tag.name }}
                    </mat-checkbox>
                  }
                </div>
              </div>

              <!-- Primary Location -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Primary Location</mat-label>
                <input matInput [(ngModel)]="tripForm.primaryLocation" name="location" required />
                <mat-icon matSuffix>location_on</mat-icon>
              </mat-form-field>

              <!-- Date Range -->
              <div class="date-row">
                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Start Date</mat-label>
                  <input matInput [matDatepicker]="startPicker" [(ngModel)]="tripForm.startDate" name="startDate" required />
                  <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                  <mat-datepicker #startPicker></mat-datepicker>
                </mat-form-field>

                <mat-form-field appearance="outline" class="half-width">
                  <mat-label>End Date</mat-label>
                  <input matInput [matDatepicker]="endPicker" [(ngModel)]="tripForm.endDate" name="endDate" required />
                  <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                  <mat-datepicker #endPicker></mat-datepicker>
                </mat-form-field>
              </div>

              <!-- Price and Capacity -->
              <div class="number-row">
                <mat-form-field appearance="outline" class="third-width">
                  <mat-label>Price ($)</mat-label>
                  <input matInput type="number" [(ngModel)]="tripForm.price" name="price" min="0" required />
                  <mat-icon matSuffix>attach_money</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline" class="third-width">
                  <mat-label>Max Capacity</mat-label>
                  <input matInput type="number" [(ngModel)]="tripForm.maxCapacity" name="maxCapacity" min="1" required />
                  <mat-icon matSuffix>group</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline" class="third-width">
                  <mat-label>Current Capacity</mat-label>
                  <input matInput type="number" [(ngModel)]="tripForm.currentCapacity" name="currentCapacity" min="0" [max]="tripForm.maxCapacity" required />
                  <mat-icon matSuffix>people</mat-icon>
                </mat-form-field>
              </div>

              <!-- Requirements -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Requirements</mat-label>
                <textarea matInput [(ngModel)]="tripForm.requirements" name="requirements" rows="2"></textarea>
                <mat-icon matSuffix>checklist</mat-icon>
              </mat-form-field>

              <!-- Description -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput [(ngModel)]="tripForm.description" name="description" rows="5" required></textarea>
                <mat-icon matSuffix>description</mat-icon>
              </mat-form-field>

              <!-- Meeting Info -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Meeting Info</mat-label>
                <textarea matInput [(ngModel)]="tripForm.meetingInfo" name="meetingInfo" rows="2"></textarea>
                <mat-icon matSuffix>event</mat-icon>
              </mat-form-field>

              <!-- Header Image URL -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Header Image URL</mat-label>
                <input matInput [(ngModel)]="tripForm.headerImage" name="headerImage" />
                <mat-icon matSuffix>image</mat-icon>
              </mat-form-field>

              <!-- Related Links -->
              <div class="links-section">
                <label class="section-label">Related Links</label>
                @for (link of tripForm.relatedLinks; track $index) {
                  <div class="link-row">
                    <mat-form-field appearance="outline" class="link-input">
                      <mat-label>Link {{ $index + 1 }}</mat-label>
                      <input matInput [(ngModel)]="tripForm.relatedLinks[$index]" [name]="'link-' + $index" />
                    </mat-form-field>
                    <button mat-icon-button color="warn" type="button" (click)="removeLink($index)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                }
                <button mat-stroked-button type="button" (click)="addLink()">
                  <mat-icon>add</mat-icon>
                  Add Link
                </button>
              </div>

              <!-- Status -->
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Status</mat-label>
                <mat-select [(ngModel)]="tripForm.status" name="status" required>
                  <mat-option value="proposed">Proposed</mat-option>
                  <mat-option value="confirmed">Confirmed</mat-option>
                </mat-select>
              </mat-form-field>

              <!-- Visibility -->
              <mat-checkbox [(ngModel)]="tripForm.visibility" name="visibility">
                Make this trip visible to others
              </mat-checkbox>

            </form>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="saveTrip()">
              {{ isEditMode ? 'Update Trip' : 'Post Trip' }}
            </button>
            <button mat-button routerLink="/">Cancel</button>
          </mat-card-actions>
        </mat-card>
      }
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

    .trip-form {
      padding: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .date-row,
    .number-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .half-width {
      flex: 1;
      min-width: 250px;
    }

    .third-width {
      flex: 1;
      min-width: 150px;
    }

    .section-label {
      display: block;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 8px;
      font-size: 14px;
    }

    .tag-section {
      margin: 8px 0;
    }

    .tag-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 12px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .links-section {
      margin: 8px 0;
    }

    .link-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .link-input {
      flex: 1;
    }

    mat-card-actions {
      padding: 16px;
      gap: 8px;
      display: flex;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      text-align: center;
      color: #666;
    }

    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #999;
      margin-bottom: 16px;
    }

    .empty-state p {
      margin: 0 0 16px 0;
      font-size: 16px;
    }

    .signin-prompt {
      margin-top: 48px;
    }
  `]
})
export class PostTripComponent implements OnInit {
  currentUserId: string | null = null;
  isEditMode = false;
  tripId: string | null = null;

  tripForm = {
    title: '',
    tags: [] as string[],
    primaryLocation: '',
    startDate: new Date(),
    endDate: new Date(),
    price: 0,
    maxCapacity: 1,
    currentCapacity: 0,
    requirements: '',
    description: '',
    meetingInfo: '',
    headerImage: '',
    relatedLinks: [''],
    status: 'proposed',
    visibility: true
  };

  availableTags = [
    { name: 'wilderness', selected: false },
    { name: 'Spring Break', selected: false },
    { name: 'Study Abroad', selected: false },
    { name: 'Student Led', selected: false }
  ];

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Check if user is signed in
    this.currentUserId = localStorage.getItem('currentUserId');

    // Check if we're in edit mode
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id');
      if (this.tripId) {
        this.isEditMode = true;
        this.loadTripForEdit(this.tripId);
      }
    });
  }

  loadTripForEdit(tripId: string) {
    this.tripService.trips$.subscribe(trips => {
      const trip = trips.find(t => t.docID === tripId);
      if (trip) {
        // Check if current user owns this trip
        if (trip.owner_id !== this.currentUserId) {
          this.snackBar.open('You can only edit your own trips', 'Close', {
            duration: 3000
          });
          this.router.navigate(['/']);
          return;
        }

        // Populate form with trip data
        this.tripForm = {
          title: trip.title,
          tags: trip.tags,
          primaryLocation: trip.primaryLocation,
          startDate: trip.startDate.toDate(),
          endDate: trip.endDate.toDate(),
          price: trip.price,
          maxCapacity: trip.maxCapacity,
          currentCapacity: trip.currentCapacity,
          requirements: trip.requirements,
          description: trip.description,
          meetingInfo: trip.meetingInfo,
          headerImage: trip.headerImage,
          relatedLinks: trip.relatedLinks.length > 0 ? trip.relatedLinks : [''],
          status: trip.status,
          visibility: trip.visibility
        };

        // Update tag selections
        this.availableTags.forEach(tag => {
          tag.selected = trip.tags.includes(tag.name);
        });
      }
    });
  }

  updateSelectedTags() {
    this.tripForm.tags = this.availableTags
      .filter(tag => tag.selected)
      .map(tag => tag.name);
  }

  addLink() {
    this.tripForm.relatedLinks.push('');
  }

  removeLink(index: number) {
    this.tripForm.relatedLinks.splice(index, 1);
    if (this.tripForm.relatedLinks.length === 0) {
      this.tripForm.relatedLinks.push('');
    }
  }

  async saveTrip() {
    // Validate required fields
    if (!this.tripForm.title || !this.tripForm.primaryLocation || 
        !this.tripForm.description) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000
      });
      return;
    }

    // Validate dates
    if (this.tripForm.startDate > this.tripForm.endDate) {
      this.snackBar.open('End date must be after start date', 'Close', {
        duration: 3000
      });
      return;
    }

    // Validate capacity
    if (this.tripForm.currentCapacity > this.tripForm.maxCapacity) {
      this.snackBar.open('Current capacity cannot exceed max capacity', 'Close', {
        duration: 3000
      });
      return;
    }

    // Filter out empty links
    const filteredLinks = this.tripForm.relatedLinks.filter(link => link.trim() !== '');

    try {
      if (this.isEditMode && this.tripId) {
        // Update existing trip
        await this.tripService.updateTrip(this.tripId, {
          title: this.tripForm.title,
          tags: this.tripForm.tags,
          primaryLocation: this.tripForm.primaryLocation,
          startDate: Timestamp.fromDate(this.tripForm.startDate),
          endDate: Timestamp.fromDate(this.tripForm.endDate),
          price: this.tripForm.price,
          maxCapacity: this.tripForm.maxCapacity,
          currentCapacity: this.tripForm.currentCapacity,
          requirements: this.tripForm.requirements,
          description: this.tripForm.description,
          meetingInfo: this.tripForm.meetingInfo,
          headerImage: this.tripForm.headerImage,
          relatedLinks: filteredLinks,
          status: this.tripForm.status,
          visibility: this.tripForm.visibility
        });

        this.snackBar.open('Trip updated successfully!', 'Close', {
          duration: 3000
        });
      } else {
        // Create new trip
        await this.tripService.submitNewTrip(
          this.currentUserId!,
          this.tripForm.title,
          this.tripForm.tags,
          this.tripForm.requirements,
          Timestamp.fromDate(this.tripForm.startDate),
          Timestamp.fromDate(this.tripForm.endDate),
          this.tripForm.price,
          this.tripForm.maxCapacity,
          this.tripForm.currentCapacity,
          this.tripForm.description,
          this.tripForm.primaryLocation,
          filteredLinks,
          this.tripForm.headerImage,
          this.tripForm.meetingInfo,
          this.tripForm.status,
          this.tripForm.visibility
        );

        this.snackBar.open('Trip posted successfully!', 'Close', {
          duration: 3000
        });
      }

      // Navigate back to homepage or my account
      this.router.navigate([this.isEditMode ? '/my-account' : '/']);

    } catch (error) {
      console.error('Error saving trip:', error);
      this.snackBar.open('Error saving trip. Please try again.', 'Close', {
        duration: 3000
      });
    }
  }
}
