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
import { Timestamp } from '@angular/fire/firestore';

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
      <app-top-filter-bar (selectedFilter)="onSelectedFilterTagChange($event)" class="filter-toolbar"></app-top-filter-bar>
      <app-search-bar [allTrips]="allTrips" (capturedFilteredIds)="onFilteredIdsChange($event)"></app-search-bar>
      <!-- <div>
        <p>DEV OUTPUT from searchbar to see what trips are being selected: {{ searchBarOutput().join(', ') }}</p>

        @for (t of allTrips; track t.docID) {
          {{t.title}} {{t.startDate.toDate()}} {{t.endDate.toDate()}}
          <pre>{{ t | json }}</pre>
        }
      </div> -->
      <app-trip-list [trips]="filteredTrips"></app-trip-list>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    .dev {
      background-color: #aaa;
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

    .filter-toolbar {
      display: flex;
      width: 100%;
      background-color: #99eeff;
    }

    .trip-list h2 {
      margin-top: 32px;
      margin-bottom: 16px;
    }
  `]
})
export class HomepageComponent {
  selectedFilter = signal<string>("");
  searchBarOutput = signal<string[]>([""]);
  filteredTrips: Trip[] = [];

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

  allTrips: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.trips$.subscribe((data) => {
      this.allTrips = data;
    });
  }
}
