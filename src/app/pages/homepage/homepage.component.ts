// src/app/pages/homepage/homepage.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopFilterBarComponent } from '../../components/top-filter-bar.component';
import { SearchBarComponent } from '../../components/search-bar.component';
import { TripListComponent } from '../../components/trip-list.component';
import { Trip } from '../../models/Trip';
import { TripService } from '../../services/trip-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TopFilterBarComponent,
    SearchBarComponent,
    TripListComponent,
    MatSnackBarModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Calvin Caravan</span>
      <span class="spacer"></span>
      @if (currentUser()) {
        <button mat-button routerLink="/post-trip">
          <mat-icon>add</mat-icon>
          Post a Trip
        </button>
        <button mat-icon-button routerLink="/my-account">
          <mat-icon>account_circle</mat-icon>
        </button>
      } @else {
        <button mat-button (click)="promptSignIn()">
          <mat-icon>add</mat-icon>
          Post a Trip
        </button>
        <button mat-icon-button routerLink="/signin">
          <mat-icon>account_circle</mat-icon>
        </button>
      }
    </mat-toolbar>
    
    <div class="container">
      <app-top-filter-bar (selectedFilter)="onSelectedFilterTagChange($event)" class="filter-toolbar"></app-top-filter-bar>
      <app-search-bar [allTrips]="allTrips" (capturedFilteredIds)="onFilteredIdsChange($event)"></app-search-bar>
      <!-- <div>
        <p>DEV OUTPUT from searchbar to see what trips are being selected: {{ searchBarOutput().join(', ') }}</p>

        @for (t of allTrips; track t.docID) {
          {{t.title}} {{t.startDate.toDate()}} {{t.endDate.toDate()}}
          <pre>{{ t | json }}</pre>
        }
      </div> -->
      <h2>Matching Trips</h2>
      <app-trip-list [trips]="filteredTrips"></app-trip-list>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #4e121bff;
      color: #f3cd01;
      font-family: 'Segoe UI', Arial, sans-serif;
      min-height: 100vh;
    }

    .spacer {
      flex: 1 1 auto;
    }

    mat-toolbar {
      background-color: #8c2131;
      color: #ffffff;
    }

    mat-toolbar button,
    mat-toolbar button mat-icon,
    mat-toolbar span {
      color: #ffffff;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #661924ff;
    }

    .filter-toolbar {
      display: flex;
      width: 100%;
      background: #8c2131;
    }

    .trip-list h2 {
      margin-top: 0px;
      margin-bottom: 16px;
      color: #f3cd01;
    }

    app-search-bar input,
    app-search-bar textarea,
    app-search-bar select {
      background-color: #ffffff;
      color: #8c2131;
      border-color: rgba(140, 33, 49, 0.45);
    }
  `]
})
export class HomepageComponent {
  selectedFilter = signal<string>("");
  searchBarOutput = signal<string[]>([""]);
  filteredTrips: Trip[] = [];

  currentUser = signal<string | null>("");
  allTrips: Trip[] = [];

  constructor(
    private tripService: TripService,
    private snackBar: MatSnackBar
  ) { }

  onFilteredIdsChange(event: string[]) {
    this.searchBarOutput.set(event);
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedFilter() !== "any") {
      this.filteredTrips = this.allTrips.filter(trip => trip.docID && this.searchBarOutput().includes(trip.docID) && trip.tags.includes(this.selectedFilter()));
    }
    else {
      this.filteredTrips = this.allTrips.filter(trip => trip.docID && this.searchBarOutput().includes(trip.docID));
    }
  }

  onSelectedFilterTagChange(event: string) {
    this.selectedFilter.set(event);
    this.applyFilters();
  }

  promptSignIn() {
    this.snackBar.open('Please sign in to post a trip', 'Close', {
      duration: 3000
    });
  }

  ngOnInit() {
    this.tripService.trips$.subscribe((data) => {
      this.allTrips = data.sort((a, b) => a.startDate.toDate().getTime() - b.startDate.toDate().getTime());
    });
    // check for a current user and set the signal
    this.currentUser.set(localStorage.getItem('currentUserId'));
  }
}
