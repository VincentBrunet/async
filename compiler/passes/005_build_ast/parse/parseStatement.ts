import {
  AstStatement,
  AstStatementKind,
} from "../../../data/ast/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";
import { parseVariable } from "./parseVariable.ts";
import { parseWhile } from "./parseWhile.ts";

export function parseStatement(
  browser: TokenBrowser,
): AstStatement | TokenImpasse {
  // const hello = expresion
  const astVariable = browser.recurse(parseVariable);
  if (!(astVariable instanceof TokenImpasse)) {
    return {
      kind: AstStatementKind.Variable,
      data: astVariable,
    };
  }
  // while (expression)
  const astWhile = browser.recurse(parseWhile);
  if (!(astWhile instanceof TokenImpasse)) {
    return {
      kind: AstStatementKind.While,
      data: astWhile,
    };
  }
  // expression
  const astExpression = browser.recurse(parseExpression);
  if (!(astExpression instanceof TokenImpasse)) {
    return {
      kind: AstStatementKind.Expression,
      data: astExpression,
    };
  }
  // unknown
  return browser.impasse("Statement", [astVariable, astWhile, astExpression]);
}
