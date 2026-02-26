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
      mergeMap(() =>
        this.transactionService.getTransactions().pipe(
          map((transactions) => TransactionActions.loadTransactionsSuccess({ transactions })),
          catchError((error) =>
            of(TransactionActions.loadTransactionsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
