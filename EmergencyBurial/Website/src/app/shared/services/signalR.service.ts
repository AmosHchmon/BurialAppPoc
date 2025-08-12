import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Subject} from 'rxjs';
import {Deceased} from "../../views/components/deceased/model/deceased";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;
  private deceasedSubject = new Subject<any>();
  private url = 'https://localhost:44349/notifications';

  constructor() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
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

    this.hubConnection.on('sendDeceased', (data: Deceased) => {

      console.log('Received new deceased notification:', data);

      this.deceasedSubject.next(data);
    });
  }

}
