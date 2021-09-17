import { AstStatement, AstStatementKind } from "../AstStatement.ts";
import { AstStatementExpression } from "../AstStatementExpression.ts";
import { AstStatementVariable } from "../AstStatementVariable.ts";
import { AstStatementWhile } from "../AstStatementWhile.ts";

export interface StatementMapping<P, R> {
  caseVariable: (param: P, ast: AstStatementVariable) => R;
  caseWhile: (param: P, ast: AstStatementWhile) => R;
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
    case AstStatementKind.While: {
      return mapping.caseWhile(param, data as AstStatementWhile);
    }
    case AstStatementKind.Expression: {
      return mapping.caseExpression(param, data as AstStatementExpression);
    }
  }
}
