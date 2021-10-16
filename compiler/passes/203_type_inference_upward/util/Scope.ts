export class Scope {
  public parent?: Scope;
  constructor(parent?: Scope) {
    this.parent = parent;
  }
}
