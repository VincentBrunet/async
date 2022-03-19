export class Tracker {
  public parent?: Tracker;
  constructor(parent?: Tracker) {
    this.parent = parent;
  }
}
