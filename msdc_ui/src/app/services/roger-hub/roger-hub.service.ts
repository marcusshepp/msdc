import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { VoteRequest, VoteResponse } from 'src/app/pointer/pointer.models';

@Injectable({
  providedIn: 'root'
})
export class RogerHubService {

  private _hubConnection?: signalR.HubConnection;
  private _name?: string;
  private _currentVote?: number;

  constructor() { }

  public set name(_: string | undefined) {
    this._name = _;
  }

  public get name(): string | undefined {
    return this._name;
  }

  public set currentVote(_: number | undefined) {
    this._currentVote = _;
  }

  public get currentVote(): number | undefined {
    return this._currentVote;
  }

  private get voteRequest(): VoteRequest {
    return {
      name: this.name,
      vote: this.currentVote,
    };
  }

  public init() {
    this.buildConnection();
    this.startConnection();
  }

  public vote(): void {
    if (this._hubConnection) {
      this._hubConnection
        .send("vote", this.voteRequest)
        .then(() => {
          console.log('message sent', this.voteRequest);
        });
    }
  }

  public printVotes(): void {
    if (this._hubConnection) {
      this._hubConnection
        .invoke("printVotes")
        .then(() => {
          console.log('printVotes');
        });
    }
  }

  // private messageReceived(): void {
  //   if (this._hubConnection) {
  //     this._hubConnection
  //       .on("messageReceived", 
  //           (username: string, message: string) => {
  //             console.log('msg rec', username, message);
  //           });
  //   }
  // }
  private messageReceived(): void {
    if (this._hubConnection) {
      this._hubConnection
        .on("messageReceived", 
            (response: VoteResponse) => {
              console.log('msg rec', response);
            });
    }
  }

  private buildConnection() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/roger-hub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Debug)
      .build();
  }

  private startConnection() {
    if (this._hubConnection) {
      this._hubConnection
        .start()
        .then(() => {
          console.log('Connection Start');
          this.messageReceived();
        })
        .catch(err => console.log('Err', err));
    }
  }
}
