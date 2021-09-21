import {
  AstResolvedShorthand,
  AstResolvedShorthandKind,
} from "../../../data/ast/AstResolvedShorthand.ts";
import { AstStatementTypedef } from "../../../data/ast/AstStatementTypedef.ts";

export class BrowsedScope {
  private parent?: BrowsedScope;

  private references = new Map<string, AstResolvedShorthand>();

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  pushTypedef(variable: AstStatementTypedef) {
    const name = variable.name;
    this.pushShorthand(name, {
      kind: AstResolvedShorthandKind.Typedef,
      data: variable,
    });
  }

  private pushShorthand(name: string, reference: AstResolvedShorthand) {
    if (this.references.get(name)) {
      throw new Error(
        "Already defined: " + (this.references.get(name)) +
          " + " + (reference.data.name),
      );
    }
    this.references.set(name, reference);
  }

  findShorthand(name: string): AstResolvedShorthand | undefined {
    const reference = this.references.get(name);
    if (reference) {
      return reference;
    }
    return this.parent?.findShorthand(name);
  }
}
