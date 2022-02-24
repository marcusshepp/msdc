import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { RogerHubService } from "../services/roger-hub/roger-hub.service";
import { PointerUser } from "./pointer.models";

@Component({
  selector: 'app-pointer',
  templateUrl: './pointer.component.html',
  styleUrls: ['./pointer.component.scss']
})
export class PointerComponent {
  public username = new FormControl(null, []);
  public signInForm: FormGroup = this.fb.group({
    username: this.username,
  });
  constructor(
    private fb: FormBuilder,
    private roger: RogerHubService,
    private http: HttpClient,
  ) {
    this.roger.init();
  }

  public connect(): void {
    let user = new PointerUser(this.username.value);
    this.roger.name = user.name;
  }

  public printVotes(): void {
    this.roger.printVotes();
  }

  public vote(value: number): void {
    this.roger.currentVote = value;
    this.roger.vote();
  }

  public foo() {
    this.http
    .get('https://localhost:5001/WeatherForecast')
    .subscribe((foo) => {
      console.log(foo);
    });
  }

}