import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementImportSlot } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { OutputStatement } from "../util/OutputStatement.ts";

export function writeResolvedClosure(
  statement: OutputStatement,
  astClosure: AstResolvedClosure,
) {
  const resolvedReference = ensure(astClosure.resolvedReference);
  switch (resolvedReference.kind) {
    case AstResolvedReferenceKind.Closure: {
      const closure = resolvedReference.data as AstResolvedClosure;
      statement.pushPart("closure[");
      statement.pushPart(closure.idx.toString());
      statement.pushPart("]");
      break;
    }
    case AstResolvedReferenceKind.FunctionParam: {
      const param = resolvedReference.data as AstExpressionFunctionParam;
      statement.pushPart("ref_make(");
      statement.pushPart("__");
      statement.pushPart(ensure(param.name));
      statement.pushPart(")");
      break;
    }
    case AstResolvedReferenceKind.Variable: {
      const variable = resolvedReference.data as AstStatementVariable;
      statement.pushPart("__");
      statement.pushPart(variable.name);
      break;
    }
    case AstResolvedReferenceKind.ImportSlot: {
      const slot = resolvedReference.data as AstStatementImportSlot;
      statement.pushPart("_import_");
      statement.pushPart(slot.name);
      break;
    }
  }
}
