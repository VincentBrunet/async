import { Keyword } from "../../../constants/Keyword.ts";
import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { AstObject } from "../data/AstObject.ts";
import { AstType } from "../data/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseBlock } from "./parseBlock.ts";

export function parseObject(stack: TokenBrowser): AstType | undefined {
  const astObject: AstObject = {};

  // Object (required)
  const first = stack.peek();
  if (first.str !== Keyword.Object) {
    return undefined;
  }
  stack.consume();

  // name (optional)
  const name = stack.peek();
  if (name.type === TokenType.Identifier) {
    stack.consume();
    astObject.name = name.str;
  }

  // block (required)
  const astBlock = stack.parse(parseBlock);
  astObject.block = astBlock;

  return astObject;
}
