import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Dashboard, canActivate: [authGuard] },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
];
