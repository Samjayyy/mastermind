import { Component } from "@angular/core";

export class Result {
  constructor(public total: number) {
    this.correctPosition = 0;
    this.correctColor = 0;
  }
  correctPosition: number;
  correctColor: number;

  get isCorrect() {
    return this.total === this.correctPosition;
  }

  getResultClass(peg: number): string {
    if (peg < this.correctPosition) {
      return "correct";
    }
    if (peg < this.correctColor + this.correctPosition) {
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

  check(attempt: Combination): Result {
    if (this.size !== attempt.size) {
      throw new Error("Size should be equal");
    }
    const result = new Result(this.pegs.length);
    const colorCount = ArrayUtil.generateArray(10, 0);
    for (let i = 0; i < this.size; i++) {
      if (this.pegs[i] === attempt.pegs[i]) {
        result.correctPosition++;
        continue;
      }
      if (colorCount[this.pegs[i]]++ < 0) {
        result.correctColor++;
      }
      if (colorCount[attempt.pegs[i]]-- > 0) {
        result.correctColor++;
      }
    }
    return result;
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

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  readonly colors = ["grey", "red", "blue", "green", "white", "yellow"];
  colorCount = 6;
  pegCount = 4;

  current: Combination;
  guesses: Combination[] = [];
  results: Result[] = [];
  solution: Combination;

  newGame(): void {
    this.results = [];
    this.guesses = [];
    this.current = new Combination(ArrayUtil.generateArray(this.pegCount, 0));
    this.solution = new Combination(
      ArrayUtil.generateRandomNumber(this.pegCount, this.colorCount)
    );
  }

  guess(): void {
    this.guesses.push(new Combination([...this.current.pegs]));
    this.results.push(this.solution.check(this.current));
  }

  tapPeg(peg: number): void {
    if (++this.current.pegs[peg] >= this.colorCount) {
      this.current.pegs[peg] = 0;
    }
  }

  get isSolved(): boolean {
    return (
      this.results.length > 0 && this.results[this.results.length - 1].isCorrect
    );
  }
}
