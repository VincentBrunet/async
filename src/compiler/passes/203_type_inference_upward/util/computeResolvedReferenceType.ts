import { AstExpressionFunctionParam } from "../../../data/ast/AstExpressionFunction.ts";
import { AstResolvedClosure } from "../../../data/ast/AstResolvedClosure.ts";
import {
  AstResolvedReference,
  AstResolvedReferenceKind,
} from "../../../data/ast/AstResolvedReference.ts";
import { AstStatementImportSlot } from "../../../data/ast/AstStatementImport.ts";
import { AstStatementVariable } from "../../../data/ast/AstStatementVariable.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { never } from "../../../lib/errors/never.ts";

export function computeResolvedReferenceType(ast: AstResolvedReference) {
  const kind = ast.kind;
  const data = ast.data;
  switch (kind) {
    case AstResolvedReferenceKind.TemplateParam: {
      return never();
    }
    case AstResolvedReferenceKind.StatementTypedef: {
      return never();
    }
    case AstResolvedReferenceKind.ResolvedClosure: {
      const resolvedClosure = data as AstResolvedClosure;
      return resolvedClosure.resolvedType;
    }
    case AstResolvedReferenceKind.StatementVariable: {
      const statementVariable = data as AstStatementVariable;
      return statementVariable.resolvedType;
    }
    case AstResolvedReferenceKind.StatementImportSlot: {
      const statementImportSlot = data as AstStatementImportSlot;
      return ensure(statementImportSlot.resolvedStatementVariable).resolvedType;
    }
    case AstResolvedReferenceKind.ExpressionFunctionParam: {
      const expressionFunctionParam = data as AstExpressionFunctionParam;
      return expressionFunctionParam.resolvedType;
    }
  }
}
