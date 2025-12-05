import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-filter-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter-bar-stub">
      <p>TopFilterBar Component - Filters will go here</p>
    </div>
  `,
  styles: [`
    .filter-bar-stub {
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
export class TopFilterBarComponent {}
