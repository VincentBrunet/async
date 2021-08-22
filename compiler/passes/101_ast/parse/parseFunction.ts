import { Keyword } from "../../../constants/Keyword.ts";
import { TokenType } from "../../001_tokens/data/TokenType.ts";
import { AstFunction } from "../data/AstFunction.ts";
import { AstType } from "../data/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { parseBlock } from "./parseBlock.ts";
import { parseIdentifier } from "./parseIdentifier.ts";
import { parseType } from "./parseType.ts";

export function parseFunction(stack: TokenBrowser): AstFunction | undefined {
  const astFunction: AstFunction = {
    params: [],
  };

  // fn (required)
  const first = stack.peek();
  if (first.str !== Keyword.Function) {
    return undefined;
  }
  stack.consume();

  // name (optional)
  const name = stack.peek();
  if (name.type === TokenType.Identifier) {
    stack.consume();
    astFunction.name = name.str;
  }

  // return type
  const delimType = stack.peek();
  if (delimType.str === ":") {
    stack.consume();
    const astType = stack.parse(parseType);
    if (astType === undefined) {
      stack.error("Expected a type");
    }
    astFunction.type = astType;
  }

  // params - open
  const delimParamOpen = stack.peek();
  if (delimParamOpen.str === "(") {
    stack.consume();

    while (true) {
      // params - close
      const delimParamClose = stack.peek();
      if (delimParamClose.str === ")") {
        stack.consume();
        break;
      }

      // params - optional name
      const name = stack.parse(parseIdentifier);
      let astType: AstType | undefined;

      // params - optional type
      const delimParamType = stack.peek();
      if (delimParamType.str === ":") {
        stack.consume();

        astType = stack.parse(parseType);
      }

      // param - validated
      astFunction.params?.push({
        name: name,
        type: astType,
      });

      // params - separator, end
      const delimParamSep = stack.peek();
      if (delimParamSep.str === ",") {
        stack.consume();
      } else if (delimParamSep.str === ")") {
        stack.consume();
        break;
      } else {
        stack.error("Expected separator between function parameters");
      }
    }
  }

  // block (optional)
  const astBlock = stack.parse(parseBlock);
  astFunction.block = astBlock;

  return astFunction;
}
