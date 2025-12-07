import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListItemComponent } from './trip-list-item.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripListItemComponent],
  template: `
    <div class="trip-list">
      <h2>Upcoming Trips</h2>
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
export class TripListComponent {}
