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
import { documentId } from '@angular/fire/firestore';
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
      <app-top-filter-bar></app-top-filter-bar>
      <!-- TODO: Remove dummy data DEVTRIP when we are successfully fetching from Firebase -->
      <app-search-bar [allTrips]="DEVTRIPS"(capturedFilteredIds)="handleChild($event)"></app-search-bar>
      <p>DEV OUTPUT from searchbar: {{ searchBarOutput().join(', ') }}</p>
      <app-trip-list></app-trip-list>
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
export class HomepageComponent {
  searchBarOutput = signal<string[]>([""]);
    // TODO: When we are successfully fetching trip objects from firebase, remove this dummy data
    DEVTRIP1: Trip = (() => {
      const fullTrip = {
        document_id: 'TRIP1',
        owner_id: 'USER67890',
        title: 'Spring Break Service Trip to Guatemala',
        tags: ['service', 'international', 'spring-break'],
        requirements: 'Passport required. Must attend 2 pre-trip meetings.',
        startDate: new Date('2025-03-10').toISOString(),
        endDate: new Date('2025-03-17').toISOString(),
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
      
      // destructure only the Trip fields
      const { document_id: id, title: title, primaryLocation: destination, startDate: date } = fullTrip;
      
      return { id, title, destination, date };
    })();
    
    handleChild(event: string[]) {
      this.searchBarOutput.set(event);  // update signal with emitted value
    }
    DEVTRIP2 = {...this.DEVTRIP1, id : "TRIP2", title : "Spring Break Getaway to Brazil"};
    DEVTRIPS: Trip[] = [this.DEVTRIP1, this.DEVTRIP2];
}
