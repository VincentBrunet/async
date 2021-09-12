import { AstExpression } from "../AstExpression.ts";
import { AstStatement, AstStatementKind } from "../AstStatement.ts";
import { AstVariable } from "../AstVariable.ts";
import { AstWhile } from "../AstWhile.ts";

export interface BrowseStatementMapping<T, R> {
  browseVariable: (param: T, ast: AstVariable) => R;
  browseWhile: (param: T, ast: AstWhile) => R;
  browseExpression: (param: T, ast: AstExpression) => R;
}

export function doBrowseStatement<T, R>(
  astStatement: AstStatement,
  param: T,
  mapping: BrowseStatementMapping<T, R>,
) {
  const kind = astStatement.kind;
  const data = astStatement.data;
  switch (kind) {
    case AstStatementKind.Variable: {
      return mapping.browseVariable(param, data as AstVariable);
    }
    case AstStatementKind.While: {
      return mapping.browseWhile(param, data as AstWhile);
    }
    case AstStatementKind.Expression: {
      return mapping.browseExpression(param, data as AstExpression);
    }
  }
}
