import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserCredentials } from '../../../models/auth.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData: UserCredentials = {
    username: '',
    email: '',
    password: '',
  };

  loading = false;
  errorMessage = '';

  onSubmit() {
    if (this.registerData.username && this.registerData.email && this.registerData.password) {
      this.loading = true;
      this.authService
        .register(this.registerData)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.errorMessage = err.error || 'Registration failed. Please try again.';
            this.loading = false;
          },
        });
    }
  }
}
