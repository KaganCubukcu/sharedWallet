import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | undefined;
  private hubUrl = `${environment.hubUrl}/wallet`;

  transactionAdded$ = new Subject<Transaction>();
  transactionDeleted$ = new Subject<number>();
  transactionUpdated$ = new Subject<Transaction>();

  private connectionPromise: Promise<void> | null = null;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        accessTokenFactory: () => localStorage.getItem('token') || '',
      })
      .withAutomaticReconnect()
      .build();

    this.connectionPromise = this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveTransaction', (data: Transaction) => {
      this.transactionAdded$.next(data);
    });

    this.hubConnection.on('TransactionDeleted', (id: number) => {
      this.transactionDeleted$.next(id);
    });

    this.hubConnection.on('TransactionUpdated', (data: Transaction) => {
      this.transactionUpdated$.next(data);
    });
  };

  public joinWalletGroup(accessId: string) {
    if (this.connectionPromise) {
      this.connectionPromise.then(() => {
        if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
          this.hubConnection
            .invoke('JoinWalletGroup', accessId)
            .catch((err) => console.error('Error joining group: ', err));
        }
      });
    }
  }

  public leaveWalletGroup(accessId: string) {
    if (
      this.connectionPromise &&
      this.hubConnection?.state === signalR.HubConnectionState.Connected
    ) {
      this.hubConnection
        .invoke('LeaveWalletGroup', accessId)
        .catch((err) => console.error('Error leaving group: ', err));
    }
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(console.error);
      this.connectionPromise = null;
    }
  }
}
