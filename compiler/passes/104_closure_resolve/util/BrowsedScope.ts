import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";

export class BrowsedScope {
  public parent?: BrowsedScope;

  private names = new Set<string>();

  private resolvedClosures = new Set<string>();

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  pushName(name: string) {
    if (this.names.has(name)) {
      throw new Error("Already defined: " + name);
    }
    this.names.add(name);
  }

  propagateName(name: string) {
    if (this.names.has(name)) {
      return;
    }
    if (this.parent) {
      this.parent.propagateName(name);
    }
    this.resolvedClosures.add(name);
  }

  readClosures(): Array<AstResolvedClosure> {
    const resolvedClosures = [...this.resolvedClosures];
    const astClosures = new Array<AstResolvedClosure>();
    for (let idx = 0; idx < resolvedClosures.length; idx++) {
      astClosures.push({
        idx: idx,
        name: resolvedClosures[idx],
      });
    }
    return astClosures;
  }
}
