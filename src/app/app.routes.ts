// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/homepage/homepage.component').then(m => m.HomepageComponent)
  },
  {
    path: 'trip/:id',
    loadComponent: () => import('./pages/trip-details/trip-details.component').then(m => m.TripDetailsComponent)
  },
  {
    path: 'post-trip',
    loadComponent: () => import('./pages/post-trip/post-trip.component').then(m => m.PostTripComponent)
  },
  {
    path: 'edit-trip/:id',
    loadComponent: () => import('./pages/post-trip/post-trip.component').then(m => m.PostTripComponent)
  },
  {
    path: 'my-account',
    loadComponent: () => import('./pages/my-account/my-account.component').then(m => m.MyAccountComponent)
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.component').then(m => m.SigninComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
