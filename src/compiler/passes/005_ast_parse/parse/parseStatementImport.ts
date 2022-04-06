import { AstStatementImport, AstStatementImportSlot } from '../../../data/ast/AstStatementImport.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseExpression } from './parseExpression.ts';

const slotOpen = new Set(['[']);
const slotClose = new Set([']']);
const slotDelim = new Set([',']);

function parseStatementImportSlot(
  browser: Browser,
): AstStatementImportSlot | TokenImpasse {
  // name
  const slotName = browser.peek();
  if (!tokenIsText(slotName)) {
    return browser.impasseLeaf('Name', 'an identifier');
  }
  browser.consume();
  // ast
  return {
    name: slotName.str,
  };
}

export function parseStatementImport(
  browser: Browser,
): AstStatementImport | TokenImpasse {
  // keyword - import
  const keywordImport = browser.peek();
  if (keywordImport.str !== 'import') {
    return browser.impasseLeaf('Keyword', 'import');
  }
  browser.consume();
  // items
  const slots = browser.recurseArray(
    'Slot',
    true,
    slotOpen,
    slotClose,
    slotDelim,
    parseStatementImportSlot,
  );
  if (slots instanceof TokenImpasse) {
    return browser.impasseNode(slots);
  }
  // keyword - from
  const keywordFrom = browser.peek();
  if (keywordFrom.str !== 'from') {
    return browser.impasseLeaf('Keyword', 'from');
  }
  browser.consume();
  // source url
  const url = browser.recurse('Expression', parseExpression);
  if (url instanceof TokenImpasse) {
    return browser.impasseNode(url);
  }
  // done
  return {
    slots: slots,
    url: url,
  };
}
