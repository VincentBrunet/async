import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { TokenType } from "../../../data/TokenType.ts";
import { ParserState } from "../ParserState.ts";
import { consumeFunction } from "./consumeFunction.ts";

export function consumeExpression(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Expression,
    children: new Map(),
  };

  const first = state.peek()

  // function
  if (first.str === "fn") {
    node.children?.set("0", [consumeFunction(state)])
  }
  // sub-expression
  else if (first.str === "(") {
    state.consume()
    node.children?.set("0", [consumeExpression(state)])
    const last = state.pop()
    if (last.str !== ")") {
      throw new Error("Expected closing bracket, got: " + last)
    }
  }
  // identifier
  else if (first.type === TokenType.Identifier) {
    state.consume()
    node.children?.set("0", [{
      type: AstNodeType.Identifier,
    }])
  }
  // todo?
  else {
    throw new Error("Unknown expression type: " + first.str)
  }

  return node;
}
