// A typed chain of responsibility: each step is a plain function that handles
// one concern and passes its output to the next. The generics make the chain
// self-checking — `.pipe(step)` only accepts a step whose input is the previous
// step's output, so the steps can only be arranged in a valid order.

export type Step<In, Out> = (input: In) => Promise<Out> | Out;

export class Chain<In, Out> {
  private constructor(
    private readonly steps: ReadonlyArray<Step<unknown, unknown>>,
  ) {}

  static new<In, Out>(step: Step<In, Out>): Chain<In, Out> {
    return new Chain<In, Out>([step as unknown as Step<unknown, unknown>]);
  }

  pipe<Next>(step: Step<Out, Next>): Chain<In, Next> {
    return new Chain<In, Next>([
      ...this.steps,
      step as unknown as Step<unknown, unknown>,
    ]);
  }

  async run(input: In): Promise<Out> {
    let value: unknown = input;
    for (const step of this.steps) {
      value = await step(value);
    }
    return value as Out;
  }
}
