export class Stack<T> {
  private content = new Array<T>();

  push(value: T) {
    this.content.push(value);
  }
  peek(): T | undefined {
    return this.content[this.content.length - 1];
  }
  pop(): T | undefined {
    return this.content.pop();
  }
}
