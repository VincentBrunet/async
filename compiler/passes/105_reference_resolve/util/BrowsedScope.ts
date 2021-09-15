import { AstParam } from "../../../data/ast/AstParam.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import {
  AstResolvedReference,
  AstResolvedReferenceKind,
} from "../../../data/ast/AstResolvedReference.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";

export class BrowsedScope {
  private parent?: BrowsedScope;

  private references = new Map<string, AstResolvedReference>();

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  pushVariable(variable: AstVariable) {
    const name = variable.name;
    this.pushReference(name, {
      kind: AstResolvedReferenceKind.Variable,
      data: variable,
    });
  }

  pushClosure(closure: AstResolvedClosure) {
    const name = closure.name;
    this.pushReference(name, {
      kind: AstResolvedReferenceKind.Closure,
      data: closure,
    });
  }

  pushParam(param: AstParam) {
    const name = param.name;
    this.pushReference(name, {
      kind: AstResolvedReferenceKind.Param,
      data: param,
    });
  }

  private pushReference(name: string, reference: AstResolvedReference) {
    if (this.references.get(name)) {
      throw new Error(
        "Already defined: " + (this.references.get(name)) +
          " + " + (reference.data.name),
      );
    }
    this.references.set(name, reference);
  }

  findReference(name: string): AstResolvedReference | undefined {
    const reference = this.references.get(name);
    if (reference) {
      return reference;
    }
    return this.parent?.findReference(name);
  }
}
