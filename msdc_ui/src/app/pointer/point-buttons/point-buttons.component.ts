import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-point-buttons',
  templateUrl: './point-buttons.component.html',
  styleUrls: ['./point-buttons.component.scss']
})
export class PointButtonsComponent {
  @Output() vote: EventEmitter<number> = new EventEmitter<number>();
  public currentVote: number | undefined;

  constructor() {}

  public submit(value: number): void {
    this.currentVote = value;
    this.vote.emit(value);
  }
}