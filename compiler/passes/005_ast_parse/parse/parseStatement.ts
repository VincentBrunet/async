import {
  AstStatement,
  AstStatementData,
  AstStatementKind,
} from "../../../data/ast/AstStatement.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseStatementCondition } from "./parseStatementCondition.ts";
import { parseStatementEmpty } from "./parseStatementEmpty.ts";
import { parseStatementExport } from "./parseStatementExport.ts";
import { parseStatementExpression } from "./parseStatementExpression.ts";
import { parseStatementImport } from "./parseStatementImport.ts";
import { parseStatementReturn } from "./parseStatementReturn.ts";
import { parseStatementTypedef } from "./parseStatementTypedef.ts";
import { parseStatementUnsafe } from "./parseStatementUnsafe.ts";
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
  // empty ;
  const astStatementEmpty = browser.recurse(parseStatementEmpty);
  if (!(astStatementEmpty instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Empty, astStatementEmpty);
  }
  // import ;
  const astStatementImport = browser.recurse(parseStatementImport);
  if (!(astStatementImport instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Import, astStatementImport);
  }
  // export statement
  const astStatementExport = browser.recurse(parseStatementExport);
  if (!(astStatementExport instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Export, astStatementExport);
  }
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
  // if (expression) {} else if (expression) {}
  const astStatementCondition = browser.recurse(parseStatementCondition);
  if (!(astStatementCondition instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Condition, astStatementCondition);
  }
  // return (expression)
  const astStatementReturn = browser.recurse(parseStatementReturn);
  if (!(astStatementReturn instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Return, astStatementReturn);
  }
  // unsafe { c }
  const astStatementUnsafe = browser.recurse(parseStatementUnsafe);
  if (!(astStatementUnsafe instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Unsafe, astStatementUnsafe);
  }
  // expression
  const astStatementExpression = browser.recurse(parseStatementExpression);
  if (!(astStatementExpression instanceof TokenImpasse)) {
    consumeEnd(browser);
    return finishStatement(AstStatementKind.Expression, astStatementExpression);
  }
  // unknown
  return browser.impasse("Statement", [
    astStatementEmpty,
    astStatementVariable,
    astStatementTypedef,
    astStatementWhile,
    astStatementCondition,
    astStatementReturn,
    astStatementUnsafe,
    astStatementExpression,
  ]);
}
