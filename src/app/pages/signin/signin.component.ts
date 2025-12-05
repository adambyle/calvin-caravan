// src/app/pages/signin/signin.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Calvin Caravan</span>
    </mat-toolbar>

    <div class="container">
      <mat-card class="signin-card">
        <mat-card-header>
          <mat-card-title>Sign In</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="signin-form-stub">
            <p>Sign in form will go here with:</p>
            <ul>
              <li>Email input</li>
              <li>Password input</li>
              <li>Sign in button</li>
            </ul>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card class="signup-card">
        <mat-card-header>
          <mat-card-title>Create Account</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="signup-form-stub">
            <p>Sign up form will go here with:</p>
            <ul>
              <li>Display Name input</li>
              <li>Email input</li>
              <li>Password input</li>
              <li>Confirm Password input</li>
              <li>Create account button</li>
            </ul>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      max-width: 500px;
      margin: 40px auto;
      padding: 20px;
    }

    .signin-card,
    .signup-card {
      margin-bottom: 24px;
    }

    .signin-form-stub,
    .signup-form-stub {
      border: 2px dashed #ccc;
      padding: 20px;
      margin: 16px 0;
      border-radius: 4px;
      background-color: #f5f5f5;
      color: #666;
    }

    .signin-form-stub ul,
    .signup-form-stub ul {
      list-style-type: none;
      padding-left: 0;
    }

    .signin-form-stub li,
    .signup-form-stub li {
      padding: 8px 0;
      border-bottom: 1px solid #ddd;
    }
  `]
})
export class SigninComponent {}
