import { AstModule } from "../../../data/ast/AstModule.ts";
import { TokenModule } from "../../../data/token/TokenModule.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashModuleId } from "../../../lib/hash/hashModuleId.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseModule(
  browser: Browser,
  moduleHash?: string,
): AstModule | TokenImpasse {
  // Asserts
  const hash = ensure(moduleHash);
  // Content
  const block = browser.recurse(parseBlock, true);
  if (block instanceof TokenImpasse) {
    return browser.impasse("Module.Block", [block]);
  }
  // done
  return {
    hash: hash,
    block: block,
  };
}
