import { AstReferenceValueClosure } from '../../../data/ast/AstReferenceValueClosure.ts';

export class Scope {
  public parent?: Scope;

  private names = new Set<string>();

  private referenceValueClosures = new Set<string>();

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
    this.referenceValueClosures.add(name);
  }

  readValueClosures(): Array<AstReferenceValueClosure> {
    const referenceValueClosures = [...this.referenceValueClosures];
    const astValueClosures = new Array<AstReferenceValueClosure>();
    for (let idx = 0; idx < referenceValueClosures.length; idx++) {
      astValueClosures.push({
        idx: idx,
        name: referenceValueClosures[idx],
      });
    }
    return astValueClosures;
  }
}
