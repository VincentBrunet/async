import { AstStatement, AstStatementKind } from "../AstStatement.ts";
import { AstVariable } from "../AstVariable.ts";
import { AstWhile } from "../AstWhile.ts";
import { AstExpression } from "../expression/AstExpression.ts";

export interface BrowseStatementMapping<P, R> {
  browseVariable: (param: P, ast: AstVariable) => R;
  browseWhile: (param: P, ast: AstWhile) => R;
  browseExpression: (param: P, ast: AstExpression) => R;
}

export function doBrowseStatement<P, R>(
  astStatement: AstStatement,
  param: P,
  mapping: BrowseStatementMapping<P, R>,
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
