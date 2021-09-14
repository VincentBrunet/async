import { AstParam } from "../../../data/ast/AstParam.ts";
import { AstVariable } from "../../../data/ast/AstVariable.ts";
import { AstExpressionIdentifier } from "../../../data/ast/expression/AstExpressionIdentifier.ts";
import { AstResolvedClosure } from "../../../data/ast/resolved/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/resolved/AstResolvedReference.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeIdentifier(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astIdentifier: AstExpressionIdentifier,
) {
  const reference = astIdentifier.reference;
  if (reference) {
    switch (reference.kind) {
      case AstResolvedReferenceKind.Closure: {
        const closure = reference.data as AstResolvedClosure;
        statement.pushPart("closure[");
        statement.pushPart(closure.idx.toString());
        statement.pushPart("]->value");
        break;
      }
      case AstResolvedReferenceKind.Param: {
        const param = reference.data as AstParam;
        statement.pushPart("__");
        statement.pushPart(param.name);
        break;
      }
      case AstResolvedReferenceKind.Variable: {
        const variable = reference.data as AstVariable;
        statement.pushPart("__");
        statement.pushPart(variable.name);
        statement.pushPart("->value");
        break;
      }
    }
  } else {
    throw new Error("Unresolved identifier:" + astIdentifier.name);
  }
}
