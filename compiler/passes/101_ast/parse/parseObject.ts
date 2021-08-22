import { Keyword } from "../../../constants/Keyword.ts";
import { AstObject } from "../data/AstObject.ts";
import { AstType } from "../data/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseObject(stack: TokenBrowser): AstType | undefined {
  const astObject: AstObject = {};

  // keyword (required)
  const first = stack.peek();
  if (first.str !== Keyword.Object) {
    return undefined;
  }
  stack.consume();

  // block (optional)
  const astBlock = stack.parse(parseBlock);
  astObject.block = astBlock;

  return astObject;
}
