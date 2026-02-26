import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalrService } from './services/signalr/signalr.service';
import { TransactionActions } from './state/transactions/transactions.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.css',
})
export class App implements OnInit {
  private store = inject(Store);
  private signalRService = inject(SignalrService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.signalRService.startConnection();

    this.store.dispatch(TransactionActions.loadTransactions());

    this.signalRService.transactionAdded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((transaction) => {
        this.store.dispatch(TransactionActions.addTransactionSuccess({ transaction }));
      });
  }
}
