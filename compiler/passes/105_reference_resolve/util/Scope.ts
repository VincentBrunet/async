import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import {
  AstResolvedReference,
  AstResolvedReferenceKind,
} from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementImportSlot } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";

export class Scope {
  public parent?: Scope;

  private references = new Map<string, AstResolvedReference>();

  constructor(parent?: Scope) {
    this.parent = parent;
  }

  pushVariable(statementVariable: AstStatementVariable) {
    const name = statementVariable.name;
    this.pushReference(name, {
      kind: AstResolvedReferenceKind.StatementVariable,
      data: statementVariable,
    });
  }

  pushImportSlot(statementImportSlot: AstStatementImportSlot) {
    const name = statementImportSlot.name;
    this.pushReference(name, {
      kind: AstResolvedReferenceKind.StatementImportSlot,
      data: statementImportSlot,
    });
  }

  pushFunctionParam(expressionFunctionParam: AstExpressionFunctionParam) {
    const name = ensure(expressionFunctionParam.name);
    this.pushReference(name, {
      kind: AstResolvedReferenceKind.ExpressionFunctionParam,
      data: expressionFunctionParam,
    });
  }

  pushClosure(resolvedClosure: AstResolvedClosure) {
    const name = resolvedClosure.name;
    this.pushReference(name, {
      kind: AstResolvedReferenceKind.ResolvedClosure,
      data: resolvedClosure,
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
