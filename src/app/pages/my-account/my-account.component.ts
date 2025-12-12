// src/app/pages/my-account/my-account.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TripListItemComponent } from '../../components/trip-list-item.component';
import { User } from '../../models/User';
import { Trip } from '../../models/Trip';
import { UserService } from '../../services/user-service';
import { TripService } from '../../services/trip-service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    TripListItemComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Calvin Caravan - My Account</span>
      <span class="spacer"></span>
      <button mat-button (click)="signOut()">
        <mat-icon>logout</mat-icon>
        Sign Out
      </button>
    </mat-toolbar>

    <div class="container">
      <!-- UserProfile Component -->
      <mat-card class="profile-card">
        <mat-card-header>
          <mat-card-title>User Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          @if (isEditing()) {
            <div class="profile-form">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Display Name</mat-label>
                <input matInput [(ngModel)]="editedUser.displayName" />
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input matInput type="email" [(ngModel)]="editedUser.email" />
              </mat-form-field>
              <div class="profile-actions">
                <button mat-raised-button color="primary" (click)="saveProfile()">
                  Save Changes
                </button>
                <button mat-button (click)="cancelEdit()">
                  Cancel
                </button>
              </div>
            </div>
          } @else {
            <div class="profile-display">
              <div class="profile-field">
                <strong>Display Name:</strong> {{ currentUser()?.displayName }}
              </div>
              <div class="profile-field">
                <strong>Email:</strong> {{ currentUser()?.email }}
              </div>
              <button mat-raised-button color="primary" (click)="startEdit()">
                <mat-icon>edit</mat-icon>
                Edit Profile
              </button>
            </div>
          }
        </mat-card-content>
      </mat-card>
      <!-- Tabs for Favorite Trips, Signed Up Trips, and Owned Trips -->
      <mat-card>
        <mat-tab-group>
          <mat-tab label="Favorite Trips">
            <div class="tab-content">
              @if (favoriteTrips().length > 0) {
                @for (trip of favoriteTrips(); track trip.docID) {
                  <app-trip-list-item [trip]="trip"></app-trip-list-item>
                }
              } @else {
                <div class="empty-state">
                  <mat-icon>favorite_border</mat-icon>
                  <p>No favorite trips yet. Browse trips and click the star to save them!</p>
                </div>
              }
            </div>
          </mat-tab>
          
          <mat-tab label="Signed Up">
            <div class="tab-content">
              @if (signedUpTrips().length > 0) {
                @for (trip of signedUpTrips(); track trip.docID) {
                  <app-trip-list-item [trip]="trip"></app-trip-list-item>
                }
              } @else {
                <div class="empty-state">
                  <mat-icon>event_available</mat-icon>
                  <p>No trips signed up for yet. Find a trip and click "Commit" to mark it!</p>
                </div>
              }
            </div>
          </mat-tab>
          
          <mat-tab label="My Trips">
            <div class="tab-content">
              @if (ownedTrips().length > 0) {
                @for (trip of ownedTrips(); track trip.docID) {
                  <div class="owned-trip-wrapper">
                    <app-trip-list-item [trip]="trip"></app-trip-list-item>
                    <div class="trip-actions">
                      <button mat-raised-button color="primary" [routerLink]="['/edit-trip', trip.docID]">
                        <mat-icon>edit</mat-icon>
                        Edit Trip
                      </button>
                      <button mat-raised-button color="warn" (click)="deleteTrip(trip.docID!)">
                        <mat-icon>delete</mat-icon>
                        Delete Trip
                      </button>
                    </div>
                  </div>
                }
              } @else {
                <div class="empty-state">
                  <mat-icon>add_circle_outline</mat-icon>
                  <p>You haven't created any trips yet. Click "Post a Trip" to get started!</p>
                  <button mat-raised-button color="primary" routerLink="/post-trip">
                    Post a Trip
                  </button>
                </div>
              }
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

    .profile-display {
      padding: 16px 0;
    }

    .profile-field {
      padding: 12px 0;
      border-bottom: 1px solid #eee;
      font-size: 15px;
    }

    .profile-field:last-of-type {
      border-bottom: none;
      margin-bottom: 16px;
    }

    .profile-form {
      padding: 16px 0;
    }

    .full-width {
      width: 100%;
      margin-bottom: 8px;
    }

    .profile-actions {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .tab-content {
      padding: 16px 0;
      min-height: 200px;
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

    .owned-trip-wrapper {
      position: relative;
      margin-bottom: 24px;
    }

    .trip-actions {
      display: flex;
      gap: 12px;
      margin-top: 12px;
      padding: 0 16px;
    }

    .signin-prompt {
      margin-top: 48px;
    }
  `]
})
export class MyAccountComponent implements OnInit {
  currentUser = signal<User | null>(null);
  allTrips: Trip[] = [];
  
  favoriteTrips = signal<Trip[]>([]);
  signedUpTrips = signal<Trip[]>([]);
  ownedTrips = signal<Trip[]>([]);
  
  isEditing = signal<boolean>(false);
  editedUser: Partial<User> = {};

  constructor(
    private userService: UserService,
    private tripService: TripService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Load current user from localStorage
    const currentUserId = localStorage.getItem('currentUserId');
    
    if (currentUserId) {
      // Subscribe to users and find the current user
      this.userService.users$.subscribe(users => {
        const user = users.find(u => u.docID === currentUserId);
        if (user) {
          this.currentUser.set(user);
          this.loadUserTrips();
        }
      });
    }

    // Subscribe to all trips
    this.tripService.trips$.subscribe(trips => {
      this.allTrips = trips;
      this.loadUserTrips();
    });
  }

  loadUserTrips() {
    const user = this.currentUser();
    if (!user || this.allTrips.length === 0) return;

    // Load favorite trips
    const favorites = this.allTrips.filter(trip => 
      user.favoriteTrips?.some(favTrip => favTrip === trip.docID)
    );
    this.favoriteTrips.set(favorites);

    // Load signed up trips
    const signedUp = this.allTrips.filter(trip => 
      user.signedUp?.some(signedTrip => signedTrip === trip.docID)
    );
    this.signedUpTrips.set(signedUp);

    // Load owned trips
    const owned = this.allTrips.filter(trip => 
      trip.owner_id === user.docID
    );
    this.ownedTrips.set(owned);
  }

  startEdit() {
    const user = this.currentUser();
    if (user) {
      this.editedUser = {
        displayName: user.displayName,
        email: user.email
      };
      this.isEditing.set(true);
    }
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.editedUser = {};
  }

  async saveProfile() {
    const user = this.currentUser();
    if (!user || !user.docID) return;

    try {
      await this.userService.updateUser(user.docID, this.editedUser);
      this.snackBar.open('Profile updated successfully!', 'Close', {
        duration: 3000
      });
      this.isEditing.set(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      this.snackBar.open('Error updating profile. Please try again.', 'Close', {
        duration: 3000
      });
    }
  }

  async deleteTrip(tripId: string) {
    if (!confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      return;
    }

    try {
      await this.tripService.deleteTrip(tripId);
      this.snackBar.open('Trip deleted successfully!', 'Close', {
        duration: 3000
      });
    } catch (error) {
      console.error('Error deleting trip:', error);
      this.snackBar.open('Error deleting trip. Please try again.', 'Close', {
        duration: 3000
      });
    }
  }

  signOut() {
    localStorage.removeItem('currentUserId');
    this.currentUser.set(null);
    this.snackBar.open('Signed out successfully!', 'Close', {
      duration: 3000
    });
    window.location.href = '/';
  }
}
