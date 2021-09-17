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
        const param = reference.data as AstExpressionFunctionParam;
        statement.pushPart("__");
        statement.pushPart(param.name);
        break;
      }
      case AstResolvedReferenceKind.Variable: {
        const variable = reference.data as AstStatementVariable;
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
