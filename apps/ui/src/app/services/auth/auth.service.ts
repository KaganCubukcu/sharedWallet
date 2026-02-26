import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User, UserCredentials } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5155/api/auth';

  register(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: UserCredentials): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' }).pipe(
      tap((token) => {
        if (token) {
          localStorage.setItem('token', token);
        }
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
