import {
  AstStatement,
  AstStatementData,
  AstStatementKind,
} from "../../../data/ast/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatementExpression } from "./parseStatementExpression.ts";
import { parseStatementVariable } from "./parseStatementVariable.ts";
import { parseStatementWhile } from "./parseStatementWhile.ts";

function makeStatement(kind: AstStatementKind, data: AstStatementData) {
  return { kind: kind, data: data };
}

export function parseStatement(
  browser: TokenBrowser,
): AstStatement | TokenImpasse {
  // const hello = expresion
  const astStatementVariable = browser.recurse(parseStatementVariable);
  if (!(astStatementVariable instanceof TokenImpasse)) {
    return makeStatement(AstStatementKind.Variable, astStatementVariable);
  }
  // while (expression)
  const astStatementWhile = browser.recurse(parseStatementWhile);
  if (!(astStatementWhile instanceof TokenImpasse)) {
    return makeStatement(AstStatementKind.While, astStatementWhile);
  }
  // expression
  const astStatementExpression = browser.recurse(parseStatementExpression);
  if (!(astStatementExpression instanceof TokenImpasse)) {
    return makeStatement(AstStatementKind.Expression, astStatementExpression);
  }
  // unknown
  return browser.impasse("Statement", [
    astStatementVariable,
    astStatementWhile,
    astStatementExpression,
  ]);
}
