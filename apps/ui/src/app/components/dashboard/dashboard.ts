import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransactionService } from '../../services/transaction/transaction.service';
import {
  selectAllTransactions,
  selectTransactionsLoading,
  selectTotalBalance,
  selectTodayTotal,
} from '../../state/transactions/transactions.selectors';
import {
  selectAllWallets,
  selectSelectedWalletId,
  selectSelectedWallet,
  selectWalletsLoading,
} from '../../state/wallets/wallets.selectors';
import { WalletActions } from '../../state/wallets/wallets.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { filter, first, tap, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SignalrService } from '../../services/signalr/signalr.service';
import { Router } from '@angular/router';
import { TransactionActions } from '../../state/transactions/transactions.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private store = inject(Store);
  private transactionService = inject(TransactionService);
  private authService = inject(AuthService);
  private signalrService = inject(SignalrService);
  private router = inject(Router);

  private subs = new Subscription();

  wallets$ = this.store.select(selectAllWallets);
  selectedWalletId$ = this.store.select(selectSelectedWalletId);
  selectedWallet$ = this.store.select(selectSelectedWallet);
  walletsLoading$ = this.store.select(selectWalletsLoading);

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

  newWalletName: string = '';
  isEditmode = false;
  editingTransactionId: number | null = null;
  currentAccessId: string | null = null;

  ngOnInit(): void {
    this.store.dispatch(WalletActions.loadWallets());
    this.signalrService.startConnection();

    this.subs.add(
      this.selectedWallet$
        .pipe(
          filter((wallet) => !!wallet),
          tap((wallet) => {
            if (this.currentAccessId) {
              this.signalrService.leaveWalletGroup(this.currentAccessId);
            }
            this.currentAccessId = wallet!.accessId!;
            this.signalrService.joinWalletGroup(this.currentAccessId);

            this.store.dispatch(TransactionActions.loadTransactions({ walletId: wallet!.id! }));
            this.newTransaction.walletId = wallet!.id;
          }),
        )
        .subscribe(),
    );

    this.subs.add(
      this.signalrService.transactionAdded$.subscribe((transaction) => {
        this.store.dispatch(TransactionActions.addTransactionSuccess({ transaction }));
      }),
    );

    this.subs.add(
      this.signalrService.transactionDeleted$.subscribe((id) => {
        this.store.dispatch(TransactionActions.deleteTransactionSuccess({ id }));
      }),
    );

    this.subs.add(
      this.signalrService.transactionUpdated$.subscribe((transaction) => {
        this.store.dispatch(TransactionActions.updateTransactionSuccess({ transaction }));
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.signalrService.stopConnection();
  }

  onWalletChange(event: any) {
    const walletId = Number(event.target.value);
    this.store.dispatch(WalletActions.selectWallet({ walletId }));
  }

  onCreateWallet() {
    if (this.newWalletName.trim()) {
      this.store.dispatch(
        WalletActions.createWallet({ wallet: { name: this.newWalletName, currency: 'USD' } }),
      );
      this.newWalletName = '';
    }
  }

  onSubmit() {
    if (
      this.newTransaction.amount &&
      this.newTransaction.description &&
      this.newTransaction.walletId
    ) {
      if (this.isEditmode && this.editingTransactionId) {
        const updateTransaction = {
          ...this.newTransaction,
          id: this.editingTransactionId,
        } as Transaction;
        this.store.dispatch(
          TransactionActions.updateTransaction({ transaction: updateTransaction }),
        );
        this.resetForm();
      } else {
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

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.store.dispatch(TransactionActions.deleteTransaction({ id }));
    }
  }

  onEdit(transaction: Transaction) {
    this.isEditmode = true;
    this.editingTransactionId = transaction.id!;

    this.newTransaction = {
      ...transaction,
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm() {
    this.isEditmode = false;
    this.editingTransactionId = null;
    const currentWalletId = this.newTransaction.walletId;
    this.newTransaction = {
      amount: 0,
      description: '',
      categoryId: 1,
      walletId: currentWalletId,
      addedBy: 'User',
      transactionDate: new Date(),
    };
  }
}
