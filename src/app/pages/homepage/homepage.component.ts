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
      <p>{{selectedFilter()}}</p>
      <!-- TODO: Remove dummy data DEVTRIP when we are successfully fetching from Firebase -->
      <app-search-bar [allTrips]="allTrips"(capturedFilteredIds)="onFilteredIdsChange($event)"></app-search-bar>
      <!-- <p>DEV OUTPUT from searchbar: {{ searchBarOutput().join(', ') }}</p> -->
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
  // TODO: When we are successfully fetching trip objects from firebase, remove this dummy data
  DEVTRIP1: Trip = (() => {
    const fullTrip = {
      document_id: 'TRIP1',
      owner_id: 'USER67890',
      origin: 'Michigan',
      title: 'Spring Break Service Trip to Guatemala',
      tags: ['service', 'international', 'spring-break'],
      requirements: 'Passport required. Must attend 2 pre-trip meetings.',
      startDate: new Date('2026-01-2').toISOString(),
      endDate: new Date('2026-01-5').toISOString(),
      postedDate: new Date().toISOString(),
      price: 1450,
      maxCapacity: 20,
      currentCapacity: 12,
      description: `Join us for a week-long service trip partnering with local schools.
        Participants will assist with construction projects, tutoring, and community outreach.`,
      primaryLocation: 'Guatemala City, Guatemala',
      relatedLinks: [
        'https://example.com/guatemala-service-trip',
        'https://example.com/packing-list'
      ],
      headerImage: 'https://example.com/images/guatemala-trip-header.jpg',
      meetingInfo: 'Weekly planning meetings Wednesdays at 7 PM in Science Building 204.',
      status: 'proposed',
      visibility: true
    };

    // DEV destructure only the Trip fields
    const { document_id: id, title: title, primaryLocation: destination, startDate: startDate, origin: origin, endDate: endDate, tags: tags } = fullTrip;

    return { id, title, destination, startDate, endDate, origin, tags };
  })();

  onFilteredIdsChange(event: string[]) {
    this.searchBarOutput.set(event);
    this.applyFilters();
  }

  applyFilters() {
      if (this.selectedFilter() !== "any")
      {
        this.filteredTrips = this.allTrips.filter(trip => this.searchBarOutput().includes(trip.id) && trip.tags.includes(this.selectedFilter()));
      }
      else {
        this.filteredTrips = this.allTrips.filter(trip => this.searchBarOutput().includes(trip.id));
    }
  }
  
  onSelectedFilterTagChange(event: string) {
    this.selectedFilter.set(event);
    this.applyFilters();
  }

  DEVTRIP2 = { ...this.DEVTRIP1, id: "TRIP2", title: "Spring Break Getaway to Brazil" };
  DEVTRIPS: Trip[] = [this.DEVTRIP1, this.DEVTRIP2];
  allTrips: Trip[] = this.DEVTRIPS;
}
