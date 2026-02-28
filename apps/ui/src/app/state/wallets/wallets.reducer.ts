import { createReducer, on } from '@ngrx/store';
import { Wallet } from '../../models/wallet.model';
import { WalletActions } from './wallets.actions';

export interface WalletState {
  wallets: Wallet[];
  selectedWalletId: number | null;
  loading: boolean;
  error: string | null;
}

export const initialState: WalletState = {
  wallets: [],
  selectedWalletId: null,
  loading: false,
  error: null,
};

export const walletReducer = createReducer(
  initialState,
  on(WalletActions.loadWallets, (state) => ({ ...state, loading: true })),
  on(WalletActions.loadWalletsSuccess, (state, { wallets }) => ({
    ...state,
    wallets,
    loading: false,
    selectedWalletId: state.selectedWalletId || (wallets.length > 0 ? wallets[0].id! : null),
  })),
  on(WalletActions.loadWalletsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(WalletActions.createWalletSuccess, (state, { wallet }) => ({
    ...state,
    wallets: [...state.wallets, wallet],
    selectedWalletId: state.selectedWalletId ? state.selectedWalletId : wallet.id!,
  })),
  on(WalletActions.selectWallet, (state, { walletId }) => ({
    ...state,
    selectedWalletId: walletId,
  })),
);
