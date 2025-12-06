import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Trip } from '../models/Trip';


// Usage: <search-bar.component [trips]="Trips[]"></demo-list>

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

      <div class ="held-trips-in-component">
          <p class="result-count">DEV Held Trips in component in search bar: {{ filteredIds.length }}</p>
        @if(allTrips()) {
          <ul>
            @for(t of allTrips(); track t.id) {
            <li>ID {{$index}}:{{t.id}} Title: {{t.title}}</li>
            }
          </ul>
        }

      <div class="results">
        <p class="result-count">DEV Filtered Results in search bar (search bar gives just the ids): {{ filteredIds.length }}</p>
        @if(filteredIds.length) {
        <ul>
          @for(i of filteredIds; track $index) {
            <li>ID {{$index}}:{{i}}</li>
          }
        </ul>

        }
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
  filteredIds: string[] = [];

  ngOnInit() {
    this.applyFilters();
  }
  filteredResultsChanged(trips: string[]) {    // called from mat-slider (change) event.
    this.capturedFilteredIds.emit(trips);   // or event.target.value?
  }

  applyFilters() {
    const trips: Trip[] | undefined = this.allTrips();
    const term = this.searchTerm.trim().toLowerCase();
    const origin = this.originFilter.trim().toLowerCase();
    const destination = this.destinationFilter.trim().toLowerCase();
    const date = this.dateFilter;

    if (!trips) {
      this.filteredResultsChanged(this.filteredIds); // DEV
      return;
    }

    if (term === "") {
      this.filteredIds = trips.map(t => t.id);
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
  }
}
