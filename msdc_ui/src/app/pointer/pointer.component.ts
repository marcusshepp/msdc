import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
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
  constructor(private fb: FormBuilder) {}

  public connect(): void {
    let user = new PointerUser(this.username.value);
    console.log(JSON.stringify(user));
  }

  public vote(value: number): void {
    console.log(value);
  }

}