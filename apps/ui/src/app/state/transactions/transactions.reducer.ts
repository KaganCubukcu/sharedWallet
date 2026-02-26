import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';
import { TransactionActions } from './transactions.actions';

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionReducer = createReducer(
  initialState,
  on(TransactionActions.loadTransactions, (state) => ({ ...state, loading: true })),
  on(TransactionActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
  })),
  on(TransactionActions.addTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: [transaction, ...state.transactions],
  })),
);
