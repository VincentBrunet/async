import {
  AstStatement,
  AstStatementData,
  AstStatementKind,
} from "../../../data/ast/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatementExpression } from "./parseStatementExpression.ts";
import { parseStatementTypedef } from "./parseStatementTypedef.ts";
import { parseStatementVariable } from "./parseStatementVariable.ts";
import { parseStatementWhile } from "./parseStatementWhile.ts";

function consumeEnd(browser: TokenBrowser) {
  const next = browser.peek();
  if (next.str === ";") {
    browser.consume();
  }
}

function finishStatement(
  kind: AstStatementKind,
  data: AstStatementData,
) {
  return { kind: kind, data: data };
}

export function parseStatement(
  browser: TokenBrowser,
): AstStatement | TokenImpasse {
  // const hello = expresion
  const astStatementVariable = browser.recurse(parseStatementVariable);
  if (!(astStatementVariable instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Variable, astStatementVariable);
  }
  // typedef Hello = type
  const astStatementTypedef = browser.recurse(parseStatementTypedef);
  if (!(astStatementTypedef instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Typedef, astStatementTypedef);
  }
  // while (expression)
  const astStatementWhile = browser.recurse(parseStatementWhile);
  if (!(astStatementWhile instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.While, astStatementWhile);
  }
  // expression
  const astStatementExpression = browser.recurse(parseStatementExpression);
  if (!(astStatementExpression instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Expression, astStatementExpression);
  }
  // unknown
  return browser.impasse("Statement", [
    astStatementVariable,
    astStatementTypedef,
    astStatementWhile,
    astStatementExpression,
  ]);
}
