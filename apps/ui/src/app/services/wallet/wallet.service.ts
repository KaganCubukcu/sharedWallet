import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wallet } from '../../models/wallet.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WalletService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/wallets`;

  getWallets(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>(this.apiUrl);
  }

  createWallet(wallet: Partial<Wallet>): Observable<Wallet> {
    return this.http.post<Wallet>(this.apiUrl, wallet);
  }
}
