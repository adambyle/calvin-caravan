import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Trip } from '../models/Trip'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatDatepickerModule,
    MatNativeDateModule
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
          <mat-label>Location</mat-label>
          <input matInput
                 [(ngModel)]="locationFilter"
                 (ngModelChange)="applyFilters()" />
        </mat-form-field>

        <!-- Destination -->
        <!-- <mat-form-field appearance="outline" class="small">
          <mat-label>Destination</mat-label>
          <input matInput
                 [(ngModel)]="destinationFilter"
                 (ngModelChange)="applyFilters()" />
        </mat-form-field> -->

        <!-- Date -->
        <mat-form-field appearance="outline" class="large">
          <mat-label>Date Range</mat-label>

          <mat-date-range-input [rangePicker]="picker">
            <input  matStartDate placeholder="Start Date" [(ngModel)]="startDate" (ngModelChange)="applyFilters()">
            <input matEndDate placeholder="End Date" [(ngModel)]="endDate" (ngModelChange)="applyFilters()">
          </mat-date-range-input>

          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-date-range-picker #picker></mat-date-range-picker>
        </mat-form-field>
      </div>

      <!-- <div class="dev">
        <div class ="held-trips-in-component">
            <p class="result-count">DEV Held Trips in component in search bar: {{ allTrips()?.length }}</p>
          @if(allTrips()) {
            <ul>
              @for(t of allTrips(); track t.id) {
              <li>ID {{$index}}:{{t.id}} Title: {{t.title}}</li>
              }
            </ul>
          }

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
      </div> -->
    </div>
  `,
  styles: [`
    .search-bar {
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .dev {
      background-color: #c6cc75ff;
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
  locationFilter = '';
  startDate = new Date();
  endDate = new Date();

  allTrips = input<Trip[]>();
  capturedFilteredIds = output<string[]>();
  filteredIds: string[] = [];

  ngOnInit() {
    this.applyFilters();
  }
  filteredResultsChanged(trips: string[]) {
    this.capturedFilteredIds.emit(trips);
  }

  applyFilters() {
    const trips: Trip[] | undefined = this.allTrips();
    const term = this.searchTerm.trim().toLowerCase();
    const location = this.locationFilter.trim().toLowerCase();
    const startDate = this.startDate;
    const endDate = this.endDate;

    if (!trips) {
      this.filteredResultsChanged(this.filteredIds);
      return;
    }

    const matches = trips.filter(t => {
      const titleMatch = term ? (t.title || '').toLowerCase().includes(term) : true;
      const locationMatch = t.primaryLocation ? (t.primaryLocation || '').toLowerCase().includes(location) : true;
      // Date logic
      const start = startDate ? new Date(startDate) : new Date(-8640000000000000);
      const end   = endDate   ? new Date(endDate)   : new Date(8640000000000000);
      const tripStart = t.startDate ? t.startDate.toDate() : new Date(-8640000000000000);
      const tripEnd   = t.endDate   ? t.endDate.toDate()   : new Date(8640000000000000);

      const dateInRange = tripStart <= end && tripEnd >= start;
      return titleMatch && locationMatch && dateInRange;
    });

  this.filteredIds = matches.filter(m => m.docID).map(m => m.docID!);
    this.filteredResultsChanged(this.filteredIds);
  }
}
