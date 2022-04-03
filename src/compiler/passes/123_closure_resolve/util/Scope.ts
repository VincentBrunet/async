import { AstReferenceClosure } from '../../../data/ast/AstReferenceClosure.ts';

export class Scope {
  public parent?: Scope;

  private names = new Set<string>();

  private referenceClosures = new Set<string>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  pushName(name: string) {
    if (this.names.has(name)) {
      throw new Error('Already defined: ' + name);
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
    this.referenceClosures.add(name);
  }

  readClosures(): Array<AstReferenceClosure> {
    const referenceClosures = [...this.referenceClosures];
    const astClosures = new Array<AstReferenceClosure>();
    for (let idx = 0; idx < referenceClosures.length; idx++) {
      astClosures.push({
        idx: idx,
        name: referenceClosures[idx],
      });
    }
    return astClosures;
  }
}
