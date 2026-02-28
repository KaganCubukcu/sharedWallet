import { createActionGroup, props } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';

export const TransactionActions = createActionGroup({
  source: 'Transaction API',
  events: {
    'Load Transactions': props<{ walletId: number }>(),
    'Load Transactions Success': props<{ transactions: Transaction[] }>(),
    'Load Transactions Failure': props<{ error: string }>(),

    'Add Transaction': props<{ transaction: Transaction }>(),
    'Add Transaction Success': props<{ transaction: Transaction }>(),
    'Add Transaction Failure': props<{ error: string }>(),

    'Delete Transaction': props<{ id: number }>(),
    'Delete Transaction Success': props<{ id: number }>(),
    'Delete Transaction Failure': props<{ error: string }>(),

    'Update Transaction': props<{ transaction: Transaction }>(),
    'Update Transaction Success': props<{ transaction: Transaction }>(),
    'Update Transaction Failure': props<{ error: string }>(),
  },
});
