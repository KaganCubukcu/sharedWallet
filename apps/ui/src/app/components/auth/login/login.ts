import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginData = {
    email: '',
    password: '',
  };

  loading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.loading = true;

      this.authService
        .login(this.loginData as any)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.errorMessage = err.error || 'Login failed. Invalid credentials.';
            this.loading = false;
          },
        });
    }
  }
}
