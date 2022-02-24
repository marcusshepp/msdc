import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { RogerHubService } from "src/app/services/roger-hub/roger-hub.service";

@Component({
  selector: 'app-point-board',
  templateUrl: './point-board.component.html',
  styleUrls: ['./point-board.component.scss']
})
export class PointBoardComponent {
  public username = new FormControl(null, []);
  public signInForm: FormGroup = this.fb.group({
    username: this.username,
  });
  constructor(
    private fb: FormBuilder,
    private roger: RogerHubService,
    private http: HttpClient,
  ) {}

//   public connect(): void {
//     this.roger.name = user.name;
//     this.roger.init();
//   }

//   public vote(value: number): void {
//     // console.log(value);
//   }

//   public foo() {
//     this.http
//     .get('https://localhost:5001/WeatherForecast')
//     .subscribe((foo) => {
//       console.log(foo);
//     });
//   }

}