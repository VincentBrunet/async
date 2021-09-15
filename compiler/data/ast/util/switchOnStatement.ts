import { AstStatement, AstStatementKind } from "../AstStatement.ts";
import { AstVariable } from "../AstVariable.ts";
import { AstWhile } from "../AstWhile.ts";
import { AstExpression } from "../expression/AstExpression.ts";

export interface StatementMapping<P, R> {
  caseVariable: (param: P, ast: AstVariable) => R;
  caseWhile: (param: P, ast: AstWhile) => R;
  caseExpression: (param: P, ast: AstExpression) => R;
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
      return mapping.caseVariable(param, data as AstVariable);
    }
    case AstStatementKind.While: {
      return mapping.caseWhile(param, data as AstWhile);
    }
    case AstStatementKind.Expression: {
      return mapping.caseExpression(param, data as AstExpression);
    }
  }
}
