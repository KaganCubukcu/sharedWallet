import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from './transactions.reducer';

export const selectTransactionState = createFeatureSelector<TransactionState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactionState,
  (state) => state.transactions,
);

export const selectTransactionsLoading = createSelector(
  selectTransactionState,
  (state) => state.loading,
);

export const selectTotalBalance = createSelector(selectAllTransactions, (transactions) =>
  transactions.reduce((acc, curr) => acc + curr.amount, 0),
);

export const selectTodayTotal = createSelector(selectAllTransactions, (transactions) => {
  const today = new Date().toDateString();
  return transactions
    .filter((t) => new Date(t.transactionDate).toDateString() === today)
    .reduce((acc, curr) => acc + curr.amount, 0);
});
