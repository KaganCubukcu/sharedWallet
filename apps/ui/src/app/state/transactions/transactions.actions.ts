import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';

export const TransactionActions = createActionGroup({
  source: 'Transaction API',
  events: {
    'Load Transactions': emptyProps(),
    'Load Transactions Success': props<{ transactions: Transaction[] }>(),
    'Load Transactions Failure': props<{ error: string }>(),
    'Add Transaction Success': props<{ transaction: Transaction }>(),
  },
});
