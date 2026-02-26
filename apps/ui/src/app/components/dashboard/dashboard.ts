import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionService } from '../../services/transaction/transaction.service';
import {
  selectAllTransactions,
  selectTransactionsLoading,
  selectTotalBalance,
  selectTodayTotal,
} from '../../state/transactions/transactions.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private store = inject(Store);
  private transactionService = inject(TransactionService);

  transactions$ = this.store.select(selectAllTransactions);
  totalBalance$ = this.store.select(selectTotalBalance);
  todayTotal$ = this.store.select(selectTodayTotal);

  loading$ = this.store.select(selectTransactionsLoading);

  newTransaction: Partial<Transaction> = {
    amount: 0,
    description: '',
    categoryId: 1,
    addedBy: 'User',
    transactionDate: new Date(),
  };

  onSubmit() {
    if (
      this.newTransaction.amount &&
      this.newTransaction.amount > 0 &&
      this.newTransaction.description
    ) {
      this.transactionService
        .createTransaction(this.newTransaction as Transaction)
        .pipe(first())
        .subscribe({
          next: () => {
            this.newTransaction.amount = 0;
            this.newTransaction.description = '';
            this.newTransaction.transactionDate = new Date();
          },
        });
    }
  }
}
