import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import {
  AstResolvedReference,
  AstResolvedReferenceKind,
} from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";

export class BrowsedScope {
  public parent?: BrowsedScope;

  private references = new Map<string, AstResolvedReference>();

  constructor(parent?: BrowsedScope) {
    this.parent = parent;
  }

  pushVariable(variable: AstStatementVariable) {
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

  pushParam(param: AstExpressionFunctionParam) {
    const name = ensure(param.name);
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
