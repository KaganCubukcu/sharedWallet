import { Component, inject, OnInit } from '@angular/core';
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
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TransactionActions } from '../../state/transactions/transactions.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private store = inject(Store);
  private transactionService = inject(TransactionService);
  private authService = inject(AuthService);
  private router = inject(Router);

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

  ngOnInit(): void {
    this.store.dispatch(TransactionActions.loadTransactions());
  }

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

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
