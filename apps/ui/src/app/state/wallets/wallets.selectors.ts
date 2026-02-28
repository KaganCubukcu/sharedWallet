import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WalletState } from './wallets.reducer';

export const selectWalletState = createFeatureSelector<WalletState>('wallets');

export const selectAllWallets = createSelector(selectWalletState, (state) => state.wallets);

export const selectSelectedWalletId = createSelector(
  selectWalletState,
  (state) => state.selectedWalletId,
);

export const selectSelectedWallet = createSelector(
  selectAllWallets,
  selectSelectedWalletId,
  (wallets, selectedId) => wallets.find((w) => w.id === selectedId) || null,
);

export const selectWalletsLoading = createSelector(selectWalletState, (state) => state.loading);
