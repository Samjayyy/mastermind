import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Combination } from "../app.component";

@Component({
  selector: "app-combination",
  templateUrl: "./combination.component.html",
  styleUrls: ["./combination.component.scss"]
})
export class CombinationComponent {
  @Input() combination: Combination;
  @Output() pegClicked: EventEmitter<number> = new EventEmitter();

  clickPeg(index: number): void {
    this.pegClicked.emit(index);
  }
}
