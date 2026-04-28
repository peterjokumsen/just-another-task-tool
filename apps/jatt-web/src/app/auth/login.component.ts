import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <a routerLink="/" class="back-link">← Back to Home</a>
        <h2>Welcome Back</h2>
        <p class="subtitle">Use your Microsoft account to access JATT.</p>

        <button (click)="onLogin()" class="btn-primary full-width">
          Sign In with Azure
        </button>

        <p class="footer-text">
          Authentication is handled securely via Azure Entra ID.
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
    `,
  ],
})
export class LoginComponent {
  private authService = inject(AuthService);

  onLogin() {
    this.authService.login();
  }
}
