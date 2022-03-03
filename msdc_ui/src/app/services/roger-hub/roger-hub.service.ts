import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Subject } from "rxjs";
import { BASE_URL } from "../base-url";

const HUB_URL = '/roger-hub';

export class RogerHubService {

    private _connection?: signalR.HubConnection;

    // create a few observables to interact with the connection api
    public isConnected$: Subject<boolean> = new Subject<boolean>();
    
    public get connection(): signalR.HubConnection | undefined {
        return this._connection;
    }

    public constructor() {
        this.buildConnection();
        this.startConnection();
        
        this.onConnectionClose();
        this.onConnectionReconnected();
    }

    private buildConnection(): void {
        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BASE_URL}/${HUB_URL}`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .configureLogging(signalR.LogLevel.Debug)
            .build();
    }

    private startConnection(): void {
        if (this._connection) {
            this._connection
                .start()
                .then(() => {
                    console.log('Connection Start');
                    this.isConnected$.next(true);
                })
                .catch(err => console.log('Err', err));
        }
    }

    private onConnectionClose(): void {
        if (this._connection) {
            this._connection
                .onclose((err?: Error): void => {
                    console.log('closed', err);
                    this.isConnected$.complete();
                });
        }
    }

    private onConnectionReconnected(): void {
        if (this._connection) {
            this._connection
                .onreconnected((connectionId?: string): void => {
                    console.log('closed', connectionId);
                });
        }
    }
}