import { AstModule } from "../../../data/ast/AstModule.ts";
import { TokenModule } from "../../../data/token/TokenModule.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseModule(
  browser: Browser,
  token?: TokenModule,
): AstModule | TokenImpasse {
  // Asserts
  const sourceToken = ensure(token);
  // Content
  const block = browser.recurse(parseBlock, true);
  if (block instanceof TokenImpasse) {
    return browser.impasse("Module.Block", [block]);
  }
  // done
  return {
    sourceToken: sourceToken,
    block: block,
  };
}
