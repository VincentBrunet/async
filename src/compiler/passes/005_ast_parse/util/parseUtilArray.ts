import { Ast } from '../../../data/ast/Ast.ts';
import { Browser } from './Browser.ts';
import { TokenImpasse } from './TokenImpasse.ts';

export interface UtilArrayAst<T extends Ast> extends Ast {
  items: Array<T>;
}

export interface UtilArraySetup<T extends Ast, Param> {
  mandatory: boolean;
  validOpen: Set<string>;
  validClose: Set<string>;
  validDelim: Set<string>;
  recurseItem: (stack: Browser, param: Param) => T | TokenImpasse;
  param: Param;
}

export function parseUtilArray<T extends Ast, Param>(
  browser: Browser,
  setup: UtilArraySetup<T, Param>,
): UtilArrayAst<T> | TokenImpasse {
  // initial open
  const tokenOpen = browser.peek();
  if (!setup.validOpen.has(tokenOpen.str)) {
    if (setup.mandatory) {
      return browser.impasseLeaf('Open', setup.validOpen);
    } else {
      return { items: [] };
    }
  }
  browser.consume();
  // until close
  const items = new Array<T>();
  while (true) {
    // failed
    if (browser.ended()) {
      return browser.impasseLeaf('EOF', setup.validClose);
    }
    // initial close
    const tokenClose = browser.peek();
    if (setup.validClose.has(tokenClose.str)) {
      browser.consume();
      break;
    }
    // item
    const item = browser.recurseWithParam('[' + items.length + ']', setup.recurseItem, setup.param);
    if (item instanceof TokenImpasse) {
      return item;
    }
    items.push(item);
    // delim
    const tokenDelim = browser.peek();
    if (setup.validDelim.has(tokenDelim.str)) {
      browser.consume();
    } else if (setup.validClose.has(tokenDelim.str)) {
      browser.consume();
      break;
    } else {
      return browser.impasseLeaf('Delim_Close', [...setup.validDelim, ...setup.validClose]);
    }
  }
  return {
    items: items,
  };
}
