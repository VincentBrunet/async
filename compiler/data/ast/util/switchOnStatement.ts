import { AstStatement, AstStatementKind } from "../AstStatement.ts";
import { AstStatementCondition } from "../AstStatementCondition.ts";
import { AstStatementExpression } from "../AstStatementExpression.ts";
import { AstStatementReturn } from "../AstStatementReturn.ts";
import { AstStatementTypedef } from "../AstStatementTypedef.ts";
import { AstStatementUnsafe } from "../AstStatementUnsafe.ts";
import { AstStatementVariable } from "../AstStatementVariable.ts";
import { AstStatementWhile } from "../AstStatementWhile.ts";

export interface StatementMapping<P, R> {
  caseVariable: (param: P, ast: AstStatementVariable) => R;
  caseTypedef: (param: P, ast: AstStatementTypedef) => R;
  caseWhile: (param: P, ast: AstStatementWhile) => R;
  caseCondition: (param: P, ast: AstStatementCondition) => R;
  caseReturn: (param: P, ast: AstStatementReturn) => R;
  caseUnsafe: (param: P, ast: AstStatementUnsafe) => R;
  caseExpression: (param: P, ast: AstStatementExpression) => R;
}

export function switchOnStatement<P, R>(
  astStatement: AstStatement,
  param: P,
  mapping: StatementMapping<P, R>,
) {
  const kind = astStatement.kind;
  const data = astStatement.data;
  switch (kind) {
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
  }
}
