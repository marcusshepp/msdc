import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-point-buttons',
  templateUrl: './point-buttons.component.html',
  styleUrls: ['./point-buttons.component.scss']
})
export class PointButtonsComponent {
    @Output() vote: EventEmitter<number> = new EventEmitter<number>();
    constructor() {}

    public submit(value: number): void {
        this.vote.emit(value);
    }
}