export class Array<T> {
  private list: T[] = [];
  constructor() {}
  public push(value: T) {
    this.list.push(value);
  }
  public list(): T[] {
    return list;
  }
  public sort(cp: (a: T, b: T) => number) {
    this.list.sort(cp);
  }
}
