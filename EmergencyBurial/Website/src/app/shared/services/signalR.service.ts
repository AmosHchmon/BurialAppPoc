import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Subject} from 'rxjs';

import {environment} from "../../../environments/environment";
import {Deceased} from "../../features/deceased/model/Deceased";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;
  private newDeceasedSubject = new Subject<Deceased>();
  private updatedDeceasedSubject = new Subject<Deceased>();
  private url = environment.hubUrl;

  public newDeceased = this.newDeceasedSubject.asObservable();
  public updatedDeceased = this.updatedDeceasedSubject.asObservable();

  constructor() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {
        transport: signalR.HttpTransportType.ServerSentEvents
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .build();

    this.startConnection();
    this.registerOnEvents();
  }

  private startConnection(): void {

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private registerOnEvents(): void {

    this.hubConnection.on('NewDeceased', (data: Deceased) => {

      console.log('Received new deceased notification:', data);

      this.newDeceasedSubject.next(data);
    });

    this.hubConnection.on('DeceasedUpdate', (data: Deceased) => {

      console.log('Received updated deceased notification:', data);

      this.updatedDeceasedSubject.next(data);
    });
  }

}
