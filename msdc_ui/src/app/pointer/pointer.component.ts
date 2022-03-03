import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { first, Observable } from 'rxjs';
import {
    PointerHubService,
} from '../services/roger-hub/pointer-hub.class';

@Component({
    selector: 'app-pointer',
    templateUrl: './pointer.component.html',
    styleUrls: ['./pointer.component.scss'],
})
export class PointerComponent {
    public username = new FormControl(null, []);
    public signInForm: FormGroup = this.fb.group({
        username: this.username,
    });
    public pointerHub$: Observable<any> | undefined;
    public isConnected: boolean | undefined;

    constructor(
        private fb: FormBuilder,
        private hub: PointerHubService,
        private http: HttpClient
    ) {
        this.hub.isConnected$
            .pipe(first())
            .subscribe((isConnected: boolean): void => {
                console.log('pointer is connected');
                this.isConnected = isConnected;
                this.pointerHub$ = this.hub.pointerHub$();
            });
    }

    public get usersConnected(): string[] | null {
    //   if (this.isConnected) {
    //     return this.roger.usersConnected;
    //   }
      return null;
    }

    public connect(): void {
    //   let user = new PointerUser(this.username.value);
    //   this.roger.name = user.name;
    //   this.roger.registerUser();
    }

    public vote(value: number): void {
    //   this.roger.currentVote = value;
    //   this.roger.vote();
    }

    public foo() {
        this.http.get('https://localhost:5001/WeatherForecast').subscribe((foo) => {
            console.log(foo);
        });
    }
}
