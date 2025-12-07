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
        @for(i of trips(); track $index) {
          <app-trip-list-item [trip]="i"></app-trip-list-item>
          <!-- DEV to see the dates {{i.startDate.toDate().toDateString()}} end {{i.endDate.toDate().toDateString()}} -->
           <!-- DEV to see the attributes of selected trips -->
          <!-- <pre>
              {{ i | json}}
          </pre> -->
          }
      </div>
      }
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
