import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeExpressionIdentifier(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astIdentifier: AstExpressionIdentifier,
) {
  const resolvedReference = astIdentifier.resolvedReference;
  if (resolvedReference) {
    switch (resolvedReference.kind) {
      case AstResolvedReferenceKind.Closure: {
        const closure = resolvedReference.data as AstResolvedClosure;
        statement.pushPart("closure[");
        statement.pushPart(closure.idx.toString());
        statement.pushPart("]->value");
        break;
      }
      case AstResolvedReferenceKind.Param: {
        const param = resolvedReference.data as AstExpressionFunctionParam;
        statement.pushPart("__");
        statement.pushPart(param.name);
        break;
      }
      case AstResolvedReferenceKind.Variable: {
        const variable = resolvedReference.data as AstStatementVariable;
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
