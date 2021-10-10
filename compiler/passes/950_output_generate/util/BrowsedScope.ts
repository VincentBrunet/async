export class BrowsedScope {
  public parent?: BrowsedScope;
  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  pushStatementPart(part: string) {
  }
}
