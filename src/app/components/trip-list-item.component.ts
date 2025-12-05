import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-list-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="trip-item-stub">
      <p>TripListItem Component - Trip details will display here</p>
    </div>
  `,
  styles: [`
    .trip-item-stub {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 16px 0;
      border-radius: 4px;
      background-color: #f5f5f5;
      text-align: center;
      color: #666;
    }
  `]
})
export class TripListItemComponent {}
