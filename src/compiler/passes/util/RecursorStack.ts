import { Stack } from '../../lib/core/data/Stack.ts';

export class RecursorStack<Scope> {
  private scoper: (parent: Scope) => Scope;
  private stack: Stack<Scope>;
  constructor(scope: Scope, scoper: (parent: Scope) => Scope) {
    this.scoper = scoper;
    this.stack = new Stack();
    this.stack.push(scope);
  }
  public push(): Scope {
    const child = this.scoper(this.stack.peek()!);
    this.stack.push(child);
    return child;
  }
  public pop(): void {
    this.stack.pop();
  }
}
