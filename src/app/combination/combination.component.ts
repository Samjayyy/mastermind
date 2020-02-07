import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  HostListener,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Combination } from "../app.component";

@Component({
  selector: "app-combination",
  templateUrl: "./combination.component.html",
  styleUrls: ["./combination.component.scss"]
})
export class CombinationComponent implements AfterViewInit, OnChanges {
  @Input() combination: Combination;
  @Output() pegClicked: EventEmitter<number> = new EventEmitter();
  size: number = 10;

  constructor(private el: ElementRef, private cdRef: ChangeDetectorRef) {}

  clickPeg(index: number): void {
    this.pegClicked.emit(index);
  }
  ngAfterViewInit(): void {
    this.resetSize();
  }

  @HostListener("window:resize")
  onResize() {
    this.resetSize();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.resetSize();
  }

  private get requiredRows(): number {
    return Math.ceil(this.combination.size / 6);
  }

  private get optimalPerRow(): number {
    return Math.ceil(this.combination.size / this.requiredRows);
  }

  private resetSize(): void {
    const component: HTMLElement = this.el.nativeElement;
    const calcSize =
      Math.floor((component.getBoundingClientRect().width-30) / this.optimalPerRow) -
      2;
    console.log(component.getBoundingClientRect().width);
    if (calcSize !== this.size) {
      console.log(calcSize);
      this.size = calcSize;
      this.cdRef.detectChanges();
    }
  }
}
