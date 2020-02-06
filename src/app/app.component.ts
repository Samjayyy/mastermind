import { Component } from "@angular/core";

export class Result {
  constructor(guess: Combination) {
    this.guess = new Combination([...guess.pegs]);
    this.correctPosition = 0;
    this.correctColor = 0;
  }

  public forSolution(solution: Combination): Result {
    if (this.guess.size !== solution.size) {
      throw new Error("Size should be equal");
    }
    this.correctColor = 0;
    this.correctColor = 0;
    const colorCount = ArrayUtil.generateArray(10, 0);
    for (let i = 0; i < this.guess.size; i++) {
      if (this.guess.pegs[i] === solution.pegs[i]) {
        this.correctPosition++;
        continue;
      }
      if (colorCount[this.guess.pegs[i]]++ < 0) {
        this.correctColor++;
      }
      if (colorCount[solution.pegs[i]]-- > 0) {
        this.correctColor++;
      }
    }
    return this;
  }

  public guess: Combination;
  public correctPosition: number;
  public correctColor: number;

  get isSolved(): boolean {
    return this.guess.size === this.correctPosition;
  }

  getClassForIndex(index: number): string {
    if (index < this.correctPosition) {
      return "correct";
    }
    if (index < this.correctPosition + this.correctColor) {
      return "colored";
    }
    return "wrong";
  }
}

export class Combination {
  constructor(public pegs: number[]) {}

  get size(): number {
    return this.pegs.length;
  }

  color(index: number): string {
    return colors[this.pegs[index]];
  }
}

export class ArrayUtil {
  static generateArray<T>(count: number, defaultValue: T): T[] {
    const pegs = [];
    for (let i = 0; i < count; i++) {
      pegs[i] = defaultValue;
    }
    return pegs;
  }

  static generateRandomNumber(count: number, numberRange: number): number[] {
    const pegs = [];
    for (let i = 0; i < count; i++) {
      pegs[i] = Math.floor(Math.random() * numberRange);
    }
    return pegs;
  }
}
export const colors = ["grey", "red", "blue", "green", "white", "yellow"];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  colorCount = 6;
  pegCount = 4;

  current: Combination;
  results: Result[];
  solution: Combination;

  constructor() {}

  public newGame(): void {
    this.current = new Combination(ArrayUtil.generateArray(this.pegCount, 0));
    this.results = [];
    this.solution = new Combination(
      ArrayUtil.generateRandomNumber(this.pegCount, this.colorCount)
    );
  }

  public guess(): void {
    this.results.push(new Result(this.current).forSolution(this.solution));
  }

  public tapPeg(peg: number): void {
    const nextColor = this.current.pegs[peg] + 1;
    this.current.pegs[peg] = nextColor >= this.colorCount ? 0 : nextColor;
  }

  public get isSolved(): boolean {
    return (
      this.results.length > 0 && this.results[this.results.length - 1].isSolved
    );
  }
}
