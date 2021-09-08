import { AstClosure } from "../../../data/ast/AstClosure.ts";

export class ResolveScope {
  private parent?: ResolveScope;

  private localNames = new Set<string>();
  private closureNames = new Set<string>();

  constructor(parent?: ResolveScope) {
    this.parent = parent;
  }

  pushLocalName(localName: string) {
    if (this.localNames.has(localName)) {
      throw new Error("Already defined: " + localName);
    }
    this.localNames.add(localName);
  }

  propagateName(name: string) {
    if (this.localNames.has(name)) {
      return;
    } else {
      this.closureNames.add(name);
    }
    this.parent?.propagateName(name);
  }

  readClosures(): Array<AstClosure> {
    const closures = new Array<AstClosure>();
    for (const closureName of this.closureNames) {
      closures.push({
        name: closureName,
      });
    }
    return closures;
  }
}
