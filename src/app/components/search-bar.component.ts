import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Trip {
  id: string;
  title?: string;
  origin?: string;
  destination?: string;
  date?: string; // ISO date string or similar
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="search-bar">
      <div class="controls">
        <input placeholder="Search trips (title, origin, destination)"
               [(ngModel)]="searchTerm"
               (ngModelChange)="onInputChange($event)"
               class="search-input" />

        <input placeholder="Origin" [(ngModel)]="originFilter" (ngModelChange)="onInputChange($event)" class="small-input" />
        <input placeholder="Destination" [(ngModel)]="destinationFilter" (ngModelChange)="onInputChange($event)" class="small-input" />
        <input type="date" [(ngModel)]="dateFilter" (ngModelChange)="onInputChange($event)" class="small-input" />
      </div>

      <div class="results">
        <p class="result-count">Results: {{ filteredIds.length }}</p>
        <!-- Optional: show a short preview of matching trips (ids + title) -->
        <ul *ngIf="previewTrips.length">
          <li *ngFor="let t of previewTrips">{{ t.id }} - {{ t.title || (t.origin + ' → ' + t.destination) }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .search-bar { margin: 16px 0; }
    .controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .search-input { flex: 1 1 320px; padding: 8px; }
    .small-input { width: 160px; padding: 8px; }
    .results { margin-top: 12px; }
    .result-count { font-weight: 600; }
  `]
})
export class SearchBarComponent implements OnDestroy {
  @Output() filtered = new EventEmitter<string[]>();

  // UI-bound
  searchTerm = '';
  originFilter = '';
  destinationFilter = '';
  dateFilter = '';

  // Internal data
  private allTrips: Trip[] = [];
  filteredIds: string[] = [];
  previewTrips: Trip[] = [];

  private input$ = new Subject<void>();
  private subs = new Subscription();

  constructor(private http: HttpClient) {
    // Debounce user input and apply filters
    this.subs.add(
      this.input$.pipe(
        debounceTime(250),
        distinctUntilChanged(),
      ).subscribe(() => this.applyFilters())
    );

    // Initial load of trips from backend
    this.loadTrips();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onInputChange(_: any) {
    // push an event into the debounced pipeline
    this.input$.next();
  }

  private loadTrips() {
    // Fetch all trips once; frontend will filter results.
    // Endpoint: GET /trips (relative to app origin)
    this.http.get<Trip[]>('/trips').subscribe({
      next: (list) => {
        this.allTrips = list || [];
        this.applyFilters();
      },
      error: (err) => {
        // For now, keep empty and log to console
        console.error('Failed to load trips from /trips', err);
        this.allTrips = [];
        this.applyFilters();
      }
    });
  }

  private applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    const origin = this.originFilter.trim().toLowerCase();
    const destination = this.destinationFilter.trim().toLowerCase();
    const date = this.dateFilter; // keep as-is for exact match

    const matches = this.allTrips.filter(t => {
      // Search term matches title/origin/destination
      const titleMatch = term ? (t.title || '').toLowerCase().includes(term) : true;
      const originMatch = origin ? (t.origin || '').toLowerCase().includes(origin) : true;
      const destMatch = destination ? (t.destination || '').toLowerCase().includes(destination) : true;
      const dateMatch = date ? (t.date ? t.date.startsWith(date) : false) : true;

      return titleMatch && originMatch && destMatch && dateMatch;
    });

    this.filteredIds = matches.map(m => m.id);
    this.previewTrips = matches.slice(0, 10);

    // Emit ids so parent components can react
    this.filtered.emit(this.filteredIds);
  }
}
