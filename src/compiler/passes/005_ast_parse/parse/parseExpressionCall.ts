import { AstExpression } from '../../../data/ast/AstExpression.ts';
import { AstExpressionCall } from '../../../data/ast/AstExpressionCall.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseExpression } from './parseExpression.ts';

const paramOpen = new Set(['(']);
const paramClose = new Set([')']);
const paramDelim = new Set([',']);

export function parseExpressionCall(
  browser: Browser,
  astCallee: AstExpression,
): AstExpressionCall | TokenImpasse {
  // params
  const astExpressions = browser.recurseArray(
    'Param',
    true,
    paramOpen,
    paramClose,
    paramDelim,
    parseExpression,
  );
  if (astExpressions instanceof TokenImpasse) {
    return browser.impasseNode(astExpressions);
  }
  // done
  return {
    callee: astCallee,
    params: astExpressions,
  };
}
