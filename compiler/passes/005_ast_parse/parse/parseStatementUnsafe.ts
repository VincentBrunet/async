import { AstStatementUnsafe } from "../../../data/ast/AstStatementUnsafe.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";

export function parseStatementUnsafe(
  browser: TokenBrowser,
): AstStatementUnsafe | TokenImpasse {
  // keyword
  const keyword = browser.peek();
  if (keyword.str !== "unsafe") {
    return browser.impasse("Unsafe.keyword");
  }
  browser.consume();

  // open
  const open = browser.peek();
  if (open.str !== "{") {
    return browser.impasse("Unsafe.open");
  }
  browser.increment();

  // content
  const parts = [];
  let deep = 1;
  while (true) {
    if (browser.ended()) {
      return browser.impasse("Unsafe.unlimited");
    }

    const current = browser.peek();
    browser.increment();

    if (current.str === "{") {
      deep++;
    }
    if (current.str === "}") {
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
    content: parts.join(""),
  };
}
