import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListItemComponent } from './trip-list-item.component';
import { Trip } from '../models/Trip';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripListItemComponent],
  template: `
    <div class="trip-list">
      <h2>Upcoming Trips</h2>
      @if(trips()) {
            <div class="results">
        <p class="result-count">DEV Filtered Results in search bar (search bar gives just the ids): {{ trips()?.length }}</p>
        <ul>
          @for(i of trips(); track $index) {
            <!-- Turn later into <app-trip-list-item></app-trip-list-item> -->
            <li>List item {{$index}}:{{i.title}}</li>
          }
        </ul>
      </div>
        }
      <app-trip-list-item></app-trip-list-item>
      <app-trip-list-item></app-trip-list-item>
      <app-trip-list-item></app-trip-list-item>
    </div>
  `,
  styles: [`
    .trip-list h2 {
      margin-top: 32px;
      margin-bottom: 16px;
    }
  `]
})
export class TripListComponent {
  trips = input<Trip[]>();
}
