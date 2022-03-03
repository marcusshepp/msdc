import { Injectable } from '@angular/core';
import { first, Observable, of, Subject } from 'rxjs';
import { RogerHubService } from './roger-hub.service';

@Injectable({
    providedIn: 'root',
})
export class PointerHubService extends RogerHubService {

    constructor() { super() }

    public vote(): void {
        if (this.connection) {
            this.connection.invoke('vote', () => {
                console.log('voted');
            });
        }
    }

    public pointerHub$(): Observable<any> {
        if (this.connection) {
            // PointerResponse
            const subject: Subject<any> = new Subject<any>();

            this.connection.on('pointerUpdate', (pointerResponse: any): void => {
                subject.next(pointerResponse);
            });

            this.connection.onclose((err?: Error): void => {
                if (err) {
                    subject.error(err);
                } else {
                    subject.complete();
                }
            });

            this.connection.start();

            return subject;
        }
        return of(null);
    }
}
