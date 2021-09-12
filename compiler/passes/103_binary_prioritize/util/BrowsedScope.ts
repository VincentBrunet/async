export class BrowsedScope {
  private parent?: BrowsedScope;

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }
}
