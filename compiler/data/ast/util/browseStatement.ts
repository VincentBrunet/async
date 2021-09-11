import { AstExpression } from "../AstExpression.ts";
import { AstStatement, AstStatementKind } from "../AstStatement.ts";
import { AstVariable } from "../AstVariable.ts";
import { AstWhile } from "../AstWhile.ts";

export interface BrowserStatement<T> {
  browseVariable: (param: T, ast: AstVariable) => void;
  browseWhile: (param: T, ast: AstWhile) => void;
  browseExpression: (param: T, ast: AstExpression) => void;
}

export function browseStatement<T>(
  astStatement: AstStatement,
  param: T,
  browser: BrowserStatement<T>,
) {
  switch (astStatement.kind) {
    case AstStatementKind.Variable: {
      browser.browseVariable(param, astStatement.data as AstVariable);
      break;
    }
    case AstStatementKind.While: {
      browser.browseWhile(param, astStatement.data as AstWhile);
      break;
    }
    case AstStatementKind.Expression: {
      browser.browseExpression(param, astStatement.data as AstExpression);
      break;
    }
  }
}
