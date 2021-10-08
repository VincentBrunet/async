import {
  AstStatementImport,
  AstStatementImportSlot,
} from "../../../data/ast/AstStatementImport.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { hashObjectKey } from "../../../lib/hash/hashObjectKey.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseExpression } from "./parseExpression.ts";

const slotOpen = new Set(["["]);
const slotClose = new Set(["]"]);
const slotDelim = new Set([","]);

function parseStatementImportSlot(
  browser: TokenBrowser,
): AstStatementImportSlot | TokenImpasse {
  // name
  const slotName = browser.peek();
  if (slotName.kind !== TokenKind.Text) {
    return browser.impasse("StatementImport.Slot.Name");
  }
  browser.consume();
  // prep
  const name = slotName.str;
  const hash = hashObjectKey(name);
  // ast
  return {
    name: name,
    hash: hash,
  };
}

export function parseStatementImport(
  browser: TokenBrowser,
): AstStatementImport | TokenImpasse {
  // keyword - import
  const keywordImport = browser.peek();
  if (keywordImport.str !== "import") {
    return browser.impasse("StatementImport.KeywordImport");
  }
  browser.consume();
  // items
  const slots = browser.recurseArray(
    true,
    slotOpen,
    slotClose,
    slotDelim,
    parseStatementImportSlot,
  );
  if (slots instanceof TokenImpasse) {
    return browser.impasse("StatementImport.Slots", [slots]);
  }
  // keyword - from
  const keywordFrom = browser.peek();
  if (keywordFrom.str !== "from") {
    return browser.impasse("StatementImport.KeywordFrom");
  }
  browser.consume();
  // source url
  const url = browser.recurse(parseExpression);
  if (url instanceof TokenImpasse) {
    return browser.impasse("StatementImport.Url", [url]);
  }
  // done
  return {
    slots: slots,
    url: url,
  };
}
