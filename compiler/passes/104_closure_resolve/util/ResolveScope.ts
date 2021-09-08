import { AstClosure } from "../../../data/ast/AstClosure.ts";

export class ResolveScope {
  private parent?: ResolveScope;

  private names = new Set<string>();

  private closures = new Set<string>();

  constructor(parent?: ResolveScope) {
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
    this.closures.add(name);
  }

  readClosures(): Array<AstClosure> {
    const closures = [...this.closures];
    const astClosures = new Array<AstClosure>();
    for (let idx = 0; idx < closures.length; idx++) {
      astClosures.push({
        idx: idx,
        name: closures[idx],
      });
    }
    return astClosures;
  }
}
