import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WalletService } from '../../services/wallet/wallet.service';
import { WalletActions } from './wallets.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class WalletEffects {
  private actions$ = inject(Actions);
  private walletService = inject(WalletService);

  loadWallets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletActions.loadWallets),
      mergeMap(() =>
        this.walletService.getWallets().pipe(
          map((wallets) => WalletActions.loadWalletsSuccess({ wallets })),
          catchError((error) => of(WalletActions.loadWalletsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  createWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WalletActions.createWallet),
      mergeMap(({ wallet }) =>
        this.walletService.createWallet(wallet).pipe(
          map((newWallet) => WalletActions.createWalletSuccess({ wallet: newWallet })),
          catchError((error) => of(WalletActions.createWalletFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
