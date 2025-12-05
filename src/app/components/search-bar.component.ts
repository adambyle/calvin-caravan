import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// Usage: <search-bar.component [trips]="Trips[]"></demo-list>

interface Trip {
  id: string;
  title?: string;
  origin?: string;
  destination?: string;
  date?: string;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  template: `
    <div class="search-bar">

      <div class="controls">

        <!-- Search -->
        <mat-form-field appearance="outline" class="wide">
          <mat-label>Search trips</mat-label>
          <input matInput placeholder="title, origin, destination"
                 [(ngModel)]="searchTerm"
                 (ngModelChange)="applyFilters()" />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>

        <!-- Origin -->
        <mat-form-field appearance="outline" class="small">
          <mat-label>Origin</mat-label>
          <input matInput
                 [(ngModel)]="originFilter"
                 (ngModelChange)="applyFilters()" />
        </mat-form-field>

        <!-- Destination -->
        <mat-form-field appearance="outline" class="small">
          <mat-label>Destination</mat-label>
          <input matInput
                 [(ngModel)]="destinationFilter"
                 (ngModelChange)="applyFilters()" />
        </mat-form-field>

        <!-- Date -->
        <mat-form-field appearance="outline" class="small">
          <mat-label>Date</mat-label>
          <input matInput type="date"
                 [(ngModel)]="dateFilter"
                 (ngModelChange)="applyFilters()" />
        </mat-form-field>

      </div>

      <div class="results">
        <p class="result-count">Results: {{ filteredIds.length }}</p>

        <ul *ngIf="previewTrips.length">
          <li *ngFor="let t of previewTrips">
            {{ t.id }} —
            {{ t.title || (t.origin + " → " + t.destination) }}
          </li>
        </ul>
      </div>

      <div>
        <p>DEV:</p>
        <p>{{ searchTerm }}, {{ originFilter }}, {{ destinationFilter }}, {{ dateFilter }}</p>
      </div>
    </div>
  `,
  styles: [`
    .search-bar {
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }

    .wide {
      flex: 1 1 320px;
      min-width: 300px;
    }

    .small {
      width: 180px;
    }

    .result-count {
      font-weight: 600;
    }
  `]
})
export class SearchBarComponent {
  // UI-bound fields
  searchTerm = '';
  originFilter = '';
  destinationFilter = '';
  dateFilter = '';

  allTrips = input<Trip[]>();
  capturedFilteredIds = output<string[]>();
  previewTrips: Trip[] = [];
  filteredIds: string[] = [];

  filteredResultsChanged(event: any) {    // called from mat-slider (change) event.
    this.capturedFilteredIds.emit(event.value);   // or event.target.value?
  }


DEVTRIP: Trip = (() => {
  const fullTrip = {
    document_id: 'TRIP12345',
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
  const { document_id: id, title, primaryLocation: destination, startDate: date } = fullTrip;

  return { id, title, destination, date };
})();

  applyFilters() {
    // const trips: Trip[] | undefined = this.allTrips();
    const trips: Trip[] = [this.DEVTRIP];
    const term = this.searchTerm.trim().toLowerCase();
    const origin = this.originFilter.trim().toLowerCase();
    const destination = this.destinationFilter.trim().toLowerCase();
    const date = this.dateFilter;

    if (!trips) {
      this.filteredResultsChanged(this.filteredIds); // DEV
      return;
    }
    const matches = trips.filter(t => {
      const titleMatch = term ? (t.title || '').toLowerCase().includes(term) : true;
      const originMatch = origin ? (t.origin || '').toLowerCase().includes(origin) : true;
      const destMatch = destination ? (t.destination || '').toLowerCase().includes(destination) : true;
      const dateMatch = date ? (t.date ? t.date.startsWith(date) : false) : true;
      return titleMatch && originMatch && destMatch && dateMatch;
    });

    this.filteredIds = matches.map(m => m.id);
    this.filteredResultsChanged(this.filteredIds);
    this.previewTrips = matches.slice(0, 10);
  }
}
