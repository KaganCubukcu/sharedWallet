import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
];
