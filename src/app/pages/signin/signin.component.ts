// src/app/pages/signin/signin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user-service';
import { User } from '../../models/User';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
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
          <form class="signin-form" (ngSubmit)="signIn()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input 
                matInput 
                type="email" 
                [(ngModel)]="signInForm.email"
                name="signInEmail"
                required
              />
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input 
                matInput 
                [type]="hideSignInPassword ? 'password' : 'text'"
                [(ngModel)]="signInForm.password"
                name="signInPassword"
                required
              />
              <button 
                mat-icon-button 
                matSuffix 
                type="button"
                (click)="hideSignInPassword = !hideSignInPassword"
              >
                <mat-icon>{{hideSignInPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>

            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              class="full-width submit-btn"
            >
              Sign In
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card class="signup-card">
        <mat-card-header>
          <mat-card-title>Create Account</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="signup-form" (ngSubmit)="signUp()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Display Name</mat-label>
              <input 
                matInput 
                [(ngModel)]="signUpForm.displayName"
                name="displayName"
                required
              />
              <mat-icon matSuffix>person</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input 
                matInput 
                type="email" 
                [(ngModel)]="signUpForm.email"
                name="signUpEmail"
                required
              />
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input 
                matInput 
                [type]="hideSignUpPassword ? 'password' : 'text'"
                [(ngModel)]="signUpForm.password"
                name="signUpPassword"
                required
              />
              <button 
                mat-icon-button 
                matSuffix 
                type="button"
                (click)="hideSignUpPassword = !hideSignUpPassword"
              >
                <mat-icon>{{hideSignUpPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirm Password</mat-label>
              <input 
                matInput 
                [type]="hideConfirmPassword ? 'password' : 'text'"
                [(ngModel)]="signUpForm.confirmPassword"
                name="confirmPassword"
                required
              />
              <button 
                mat-icon-button 
                matSuffix 
                type="button"
                (click)="hideConfirmPassword = !hideConfirmPassword"
              >
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>

            @if (passwordMismatch) {
              <div class="error-message">
                <mat-icon>error</mat-icon>
                Passwords do not match
              </div>
            }

            <button 
              mat-raised-button 
              color="accent" 
              type="submit"
              class="full-width submit-btn"
            >
              Create Account
            </button>
          </form>
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

    .signin-form,
    .signup-form {
      padding: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .full-width {
      width: 100%;
    }

    .submit-btn {
      margin-top: 16px;
      height: 48px;
      font-size: 16px;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #d32f2f;
      font-size: 14px;
      margin-top: 8px;
      padding: 8px 12px;
      background-color: #ffebee;
      border-radius: 4px;
    }

    .error-message mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  `]
})
export class SigninComponent implements OnInit {
  signInForm = {
    email: '',
    password: ''
  };

  signUpForm = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  hideSignInPassword = true;
  hideSignUpPassword = true;
  hideConfirmPassword = true;
  passwordMismatch = false;

  allUsers: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Subscribe to all users
    this.userService.users$.subscribe(users => {
      this.allUsers = users;
    });

    // Check if already signed in
    const currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      this.router.navigate(['/my-account']);
    }
  }

  signIn() {
    if (!this.signInForm.email || !this.signInForm.password) {
      this.snackBar.open('Please fill in all fields', 'Close', {
        duration: 3000
      });
      return;
    }

    // Find user with matching email and password
    const user = this.allUsers.find(u => 
      u.email === this.signInForm.email && 
      u.password === this.signInForm.password
    );

    if (user && user.docID) {
      // Store user ID in localStorage
      localStorage.setItem('currentUserId', user.docID);
      
      this.snackBar.open(`Welcome back, ${user.displayName}!`, 'Close', {
        duration: 3000
      });
      
      // Navigate to my-account page
      this.router.navigate(['/my-account']);
    } else {
      this.snackBar.open('Invalid email or password', 'Close', {
        duration: 3000
      });
    }
  }

  async signUp() {
    // Validate form
    if (!this.signUpForm.displayName || !this.signUpForm.email || 
        !this.signUpForm.password || !this.signUpForm.confirmPassword) {
      this.snackBar.open('Please fill in all fields', 'Close', {
        duration: 3000
      });
      return;
    }

    // Check if passwords match
    if (this.signUpForm.password !== this.signUpForm.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;

    // Check if email already exists
    const existingUser = this.allUsers.find(u => u.email === this.signUpForm.email);
    if (existingUser) {
      this.snackBar.open('An account with this email already exists', 'Close', {
        duration: 3000
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.signUpForm.email)) {
      this.snackBar.open('Please enter a valid email address', 'Close', {
        duration: 3000
      });
      return;
    }

    // Validate password strength (at least 6 characters)
    if (this.signUpForm.password.length < 6) {
      this.snackBar.open('Password must be at least 6 characters', 'Close', {
        duration: 3000
      });
      return;
    }

    try {
      // Create new user
      await this.userService.submitNewUser(
        this.signUpForm.displayName,
        this.signUpForm.email,
        this.signUpForm.password
      );

      this.snackBar.open('Account created successfully! Please sign in.', 'Close', {
        duration: 3000
      });

      // Clear sign up form
      this.signUpForm = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      };

      // Optionally auto-sign in the user
      // Wait a moment for the new user to be added to the users$ observable
      setTimeout(() => {
        const newUser = this.allUsers.find(u => u.email === this.signUpForm.email);
        if (newUser && newUser.docID) {
          localStorage.setItem('currentUserId', newUser.docID);
          this.router.navigate(['/my-account']);
        }
      }, 500);

    } catch (error) {
      console.error('Error creating account:', error);
      this.snackBar.open('Error creating account. Please try again.', 'Close', {
        duration: 3000
      });
    }
  }
}
