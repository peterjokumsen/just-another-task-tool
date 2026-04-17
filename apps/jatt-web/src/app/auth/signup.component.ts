import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h2>Create Account</h2>
        <p class="subtitle">Join JATT today and boost your productivity.</p>

        <form (submit)="onSubmit($event)">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" required />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn-primary full-width">Sign Up</button>
        </form>

        <p class="footer-text">
          Already have an account? <a routerLink="/login">Sign in</a>
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0b0e14;
        padding: 2rem;
        font-family: 'Inter', sans-serif;
        color: #fff;
      }

      .auth-card {
        background: rgba(255, 255, 255, 0.03);
        padding: 3rem;
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        width: 100%;
        max-width: 450px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      }

      .back-link {
        color: #94a3b8;
        text-decoration: none;
        font-size: 0.875rem;
        display: block;
        margin-bottom: 2rem;
      }

      h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        color: #94a3b8;
        margin-bottom: 2.5rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #cbd5e1;
      }

      input {
        width: 100%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.75rem 1rem;
        border-radius: 12px;
        color: #fff;
        font-size: 1rem;
        transition: border-color 0.3s ease;
      }

      input:focus {
        outline: none;
        border-color: #3b82f6;
      }

      .btn-primary {
        background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
        color: #fff;
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        margin-top: 1rem;
      }

      .full-width {
        width: 100%;
      }

      .footer-text {
        margin-top: 2rem;
        text-align: center;
        color: #94a3b8;
        font-size: 0.875rem;
      }

      .footer-text a {
        color: #3b82f6;
        text-decoration: none;
        font-weight: 600;
      }
    `,
  ],
})
export class SignupComponent {
  onSubmit(event: Event) {
    event.preventDefault();
    alert('Signup functionality is stubbed for now.');
  }
}
