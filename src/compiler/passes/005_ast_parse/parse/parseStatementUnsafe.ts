import { AstStatementUnsafe } from '../../../data/ast/AstStatementUnsafe.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';

export function parseStatementUnsafe(
  browser: Browser,
): AstStatementUnsafe | TokenImpasse {
  // keyword
  const keyword = browser.peek();
  if (keyword.str !== 'unsafe') {
    return browser.impasseLeaf('Keyword', 'unsafe');
  }
  browser.consume();

  // open
  const open = browser.peek();
  if (open.str !== '{') {
    return browser.impasseLeaf('Open', '{');
  }
  browser.increment();

  // content
  const parts = [];
  let deep = 1;
  while (true) {
    if (browser.ended()) {
      return browser.impasseLeaf('EOF', '}');
    }

    const current = browser.peek();
    browser.increment();

    if (current.str === '{') {
      deep++;
    }
    if (current.str === '}') {
      deep--;
    }

    if (deep <= 0) {
      break;
    }

    parts.push(current.str);
  }

  // Done
  browser.forward();
  return {
    content: parts.join(''),
  };
}
