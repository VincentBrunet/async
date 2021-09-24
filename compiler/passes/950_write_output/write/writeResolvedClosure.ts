import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeResolvedClosure(
  statement: OutputStatement,
  astClosure: AstResolvedClosure,
) {
  const resolvedReference = astClosure.resolvedReference;
  if (resolvedReference) {
    switch (resolvedReference.kind) {
      case AstResolvedReferenceKind.Closure: {
        const closure = resolvedReference.data as AstResolvedClosure;
        statement.pushPart("closure[");
        statement.pushPart(closure.idx.toString());
        statement.pushPart("]");
        break;
      }
      case AstResolvedReferenceKind.Param: {
        const param = resolvedReference.data as AstExpressionFunctionParam;
        statement.pushPart("ref_make(");
        statement.pushPart("__");
        statement.pushPart(param.name);
        statement.pushPart(")");
        break;
      }
      case AstResolvedReferenceKind.Variable: {
        const variable = resolvedReference.data as AstStatementVariable;
        statement.pushPart("__");
        statement.pushPart(variable.name);
        break;
      }
    }
  } else {
    throw new Error("Unresolved Closure:" + astClosure.name);
  }
}
