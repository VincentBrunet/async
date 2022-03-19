import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstExpressionIdentifier } from "../../../data/ast/AstExpressionIdentifier.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import { AstResolvedReferenceKind } from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementImportSlot } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashLocalSymbol } from "../../../lib/hash/hashLocalSymbol.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { Transpiler } from "../util/Transpiler.ts";

export function transpileExpressionIdentifier(
  pass: RecursorPass,
  astIdentifier: AstExpressionIdentifier,
  transpiler: Transpiler,
) {
  // Assert
  const resolvedReference = ensure(astIdentifier.resolvedReference);
  // Find proper lookup
  switch (resolvedReference.kind) {
    case AstResolvedReferenceKind.StatementVariable: {
      const statementVariable = resolvedReference.data as AstStatementVariable;
      transpiler.pushStatementPart(
        hashLocalSymbol("variable", statementVariable.name),
      );
      transpiler.pushStatementPart("->value");
      break;
    }
    case AstResolvedReferenceKind.StatementImportSlot: {
      const statementImportSlot = resolvedReference
        .data as AstStatementImportSlot;
      transpiler.pushStatementPart(
        hashLocalSymbol("import", statementImportSlot.name),
      );
      transpiler.pushStatementPart("->value");
      break;
    }
    case AstResolvedReferenceKind.ExpressionFunctionParam: {
      const expressionFunctionParam = resolvedReference
        .data as AstExpressionFunctionParam;
      transpiler.pushStatementPart(
        hashLocalSymbol("param", ensure(expressionFunctionParam.name)),
      );
      break;
    }
    case AstResolvedReferenceKind.ResolvedClosure: {
      const resolvedClosure = resolvedReference.data as AstResolvedClosure;
      transpiler.pushStatementPart("closure[");
      transpiler.pushStatementPart(resolvedClosure.idx.toString());
      transpiler.pushStatementPart("]->value");
      break;
    }
  }
}
