import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementImportSlot } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileResolvedClosure(
  transpiler: Transpiler,
  ast: AstResolvedClosure,
) {
  // Assert
  const resolvedReference = ensure(ast.resolvedReference);
  // Resolve proper lookup
  switch (resolvedReference.kind) {
    case AstResolvedReferenceKind.StatementVariable: {
      const statementVariable = resolvedReference.data as AstStatementVariable;
      transpiler.pushPart("_variable_");
      transpiler.pushPart(statementVariable.name);
      break;
    }
    case AstResolvedReferenceKind.StatementImportSlot: {
      const statementImportSlot = resolvedReference
        .data as AstStatementImportSlot;
      transpiler.pushPart("_import_");
      transpiler.pushPart(statementImportSlot.name);
      break;
    }
    case AstResolvedReferenceKind.ExpressionFunctionParam: {
      const expressionFunctionParam = resolvedReference
        .data as AstExpressionFunctionParam;
      transpiler.pushPart("ref_make(");
      transpiler.pushPart("_param_");
      transpiler.pushPart(ensure(expressionFunctionParam.name));
      transpiler.pushPart(")");
      break;
    }
    case AstResolvedReferenceKind.ResolvedClosure: {
      const resolvedClosure = resolvedReference.data as AstResolvedClosure;
      transpiler.pushPart("closure[");
      transpiler.pushPart(resolvedClosure.idx.toString());
      transpiler.pushPart("]");
      break;
    }
  }
}
