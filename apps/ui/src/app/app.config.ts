import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { transactionReducer } from './state/transactions/transactions.reducer';
import { TransactionEffects } from './state/transactions/transactions.effects';
import { authInterceptor } from './interceptors/auth.interceptor';
import { walletReducer } from './state/wallets/wallets.reducer';
import { WalletEffects } from './state/wallets/wallets.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ transactions: transactionReducer, wallets: walletReducer }),
    provideEffects([TransactionEffects, WalletEffects]),
  ],
};
