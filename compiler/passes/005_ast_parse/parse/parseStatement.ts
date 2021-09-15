import {
  AstStatement,
  AstStatementData,
  AstStatementKind,
} from "../../../data/ast/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./expression/parseExpression.ts";
import { parseVariable } from "./parseVariable.ts";
import { parseWhile } from "./parseWhile.ts";

function makeStatement(kind: AstStatementKind, data: AstStatementData) {
  return { kind: kind, data: data };
}

export function parseStatement(
  browser: TokenBrowser,
): AstStatement | TokenImpasse {
  // const hello = expresion
  const astVariable = browser.recurse(parseVariable);
  if (!(astVariable instanceof TokenImpasse)) {
    return makeStatement(AstStatementKind.Variable, astVariable);
  }
  // while (expression)
  const astWhile = browser.recurse(parseWhile);
  if (!(astWhile instanceof TokenImpasse)) {
    return makeStatement(AstStatementKind.While, astWhile);
  }
  // expression
  const astExpression = browser.recurse(parseExpression);
  if (!(astExpression instanceof TokenImpasse)) {
    return makeStatement(AstStatementKind.Expression, astExpression);
  }
  // unknown
  return browser.impasse("Statement", [astVariable, astWhile, astExpression]);
}
