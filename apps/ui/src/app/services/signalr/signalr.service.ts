import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Transaction } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | undefined;

  transactionAdded$ = new Subject<Transaction>();

  constructor() {}

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5155/hubs/wallet')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveTransaction', (data: Transaction) => {
      this.transactionAdded$.next(data);
    });
  };
}
