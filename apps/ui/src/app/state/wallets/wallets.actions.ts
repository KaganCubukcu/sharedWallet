import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Wallet } from '../../models/wallet.model';

export const WalletActions = createActionGroup({
  source: 'Wallets',
  events: {
    'Load Wallets': emptyProps(),
    'Load Wallets Success': props<{ wallets: Wallet[] }>(),
    'Load Wallets Failure': props<{ error: string }>(),
    'Create Wallet': props<{ wallet: Partial<Wallet> }>(),
    'Create Wallet Success': props<{ wallet: Wallet }>(),
    'Create Wallet Failure': props<{ error: string }>(),
    'Select Wallet': props<{ walletId: number }>(),
  },
});
