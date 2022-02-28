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
  private _names: string[] = [];

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

  public get usersConnected(): string[] {
    return this._names;
  }

  public get isConnected(): boolean {
    return !!this._hubConnection && !!this.name && this.name.length > 0;
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

  public registerUser(): void {
    if (this._hubConnection) {
      this._hubConnection
        .send("registerUser", this.name)
        .then(() => {
          console.log('registering user', this.name);
        });
    }
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

  private userRegistered(): void {
    if (this._hubConnection) {
      this._hubConnection
        .on("userRegistered", 
            (name: string) => {
              if (!this._names?.includes(name)) {
                this._names = [...this._names, name];
              }
              console.log(name, this._names);
            });
    }
  }

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
          this.userRegistered();
        })
        .catch(err => console.log('Err', err));
    }
  }
}
