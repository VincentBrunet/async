import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { TokenType } from "../../../data/TokenType.ts";
import { ParserState } from "../ParserState.ts";
import { consumeType } from "./consumeType.ts";
import { consumeBlock } from "./consumeBlock.ts";

export function consumeFunction(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Function,
    children: new Map(),
  };

  // keyword
  const keyword = state.pop();
  if (keyword.str != "fn") {
    throw new Error("Invalid function keyword: " + keyword.str);
  }

  // name
  const name = state.peek();
  if (name.type === TokenType.Identifier) {
    state.consume();
    node.metas?.set("name", name.str);
  }

  // params
  if (state.peek().str === "(") {
    state.consume();

    const params: AstNode[] = [];

    while (true) {
      if (state.peek().str === ")") {
        state.consume();
        break;
      }

      const name = state.pop();
      if (name.type !== TokenType.Identifier) {
        throw new Error("Expecting a parameter name, got: " + name.str);
      }

      const delim = state.pop();
      if (delim.str != ":") {
        throw new Error("Expecting a type, got: " + delim.str);
      }

      const type = consumeType(state);
      const node: AstNode = {
        type: AstNodeType.FunctionParam,
        children: new Map(),
        metas: new Map(),
      };

      node.children?.set("type", [type])
      node.metas?.set("name", name.str)

      params.push(node)

      if (state.peek().str === ",") {
        state.consume();
      }
    }

    node.children?.set("params", params);
  }

  // block
  node.children?.set("block", [consumeBlock(state)]);

  return node;
}
