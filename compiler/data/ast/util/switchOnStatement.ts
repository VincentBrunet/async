import { AstStatement, AstStatementKind } from "../AstStatement.ts";
import { AstStatementCondition } from "../AstStatementCondition.ts";
import { AstStatementEmpty } from "../AstStatementEmpty.ts";
import { AstStatementExport } from "../AstStatementExport.ts";
import { AstStatementExpression } from "../AstStatementExpression.ts";
import { AstStatementImport } from "../AstStatementImport.ts";
import { AstStatementReturn } from "../AstStatementReturn.ts";
import { AstStatementTypedef } from "../AstStatementTypedef.ts";
import { AstStatementUnsafe } from "../AstStatementUnsafe.ts";
import { AstStatementVariable } from "../AstStatementVariable.ts";
import { AstStatementWhile } from "../AstStatementWhile.ts";

export interface StatementMapping<P, R> {
  caseImport: (param: P, ast: AstStatementImport) => R;
  caseExport: (param: P, ast: AstStatementExport) => R;
  caseVariable: (param: P, ast: AstStatementVariable) => R;
  caseTypedef: (param: P, ast: AstStatementTypedef) => R;
  caseWhile: (param: P, ast: AstStatementWhile) => R;
  caseCondition: (param: P, ast: AstStatementCondition) => R;
  caseReturn: (param: P, ast: AstStatementReturn) => R;
  caseUnsafe: (param: P, ast: AstStatementUnsafe) => R;
  caseExpression: (param: P, ast: AstStatementExpression) => R;
  caseEmpty: (param: P, ast: AstStatementEmpty) => R;
}

export function switchOnStatement<P, R>(
  astStatement: AstStatement,
  param: P,
  mapping: StatementMapping<P, R>,
) {
  const kind = astStatement.kind;
  const data = astStatement.data;
  switch (kind) {
    case AstStatementKind.Import: {
      return mapping.caseImport(param, data as AstStatementImport);
    }
    case AstStatementKind.Export: {
      return mapping.caseExport(param, data as AstStatementExport);
    }
    case AstStatementKind.Variable: {
      return mapping.caseVariable(param, data as AstStatementVariable);
    }
    case AstStatementKind.Typedef: {
      return mapping.caseTypedef(param, data as AstStatementTypedef);
    }
    case AstStatementKind.While: {
      return mapping.caseWhile(param, data as AstStatementWhile);
    }
    case AstStatementKind.Condition: {
      return mapping.caseCondition(param, data as AstStatementCondition);
    }
    case AstStatementKind.Return: {
      return mapping.caseReturn(param, data as AstStatementReturn);
    }
    case AstStatementKind.Unsafe: {
      return mapping.caseUnsafe(param, data as AstStatementUnsafe);
    }
    case AstStatementKind.Expression: {
      return mapping.caseExpression(param, data as AstStatementExpression);
    }
    case AstStatementKind.Empty: {
      return mapping.caseEmpty(param, data as AstStatementEmpty);
    }
  }
}
