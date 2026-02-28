import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionService } from '../../services/transaction/transaction.service';
import { TransactionActions } from './transactions.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TransactionEffects {
  private actions$ = inject(Actions);
  private transactionService = inject(TransactionService);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      mergeMap(({ walletId }) =>
        this.transactionService.getTransactions(walletId).pipe(
          map((transactions) => TransactionActions.loadTransactionsSuccess({ transactions })),
          catchError((error) =>
            of(TransactionActions.loadTransactionsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransaction),
      mergeMap(({ id }) =>
        this.transactionService.deleteTransaction(id).pipe(
          map(() => TransactionActions.deleteTransactionSuccess({ id })),
          catchError((error) =>
            of(TransactionActions.deleteTransactionFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransaction),
      mergeMap(({ transaction }) =>
        this.transactionService.updateTransaction(transaction).pipe(
          map(() => TransactionActions.updateTransactionSuccess({ transaction })),
          catchError((error) =>
            of(TransactionActions.updateTransactionFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
