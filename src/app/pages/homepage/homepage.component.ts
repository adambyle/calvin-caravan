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
    TripListComponent
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
      <app-search-bar (message)="handleChild($event.target.value)"></app-search-bar>
      <p>Message from searchbar: {{ message() }}</p>
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
  message = signal('');

  handleChild(message: string[]) {
    this.message.set(msg);  // update signal with emitted value
  }
}
