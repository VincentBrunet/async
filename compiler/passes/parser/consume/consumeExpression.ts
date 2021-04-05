import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { TokenType } from "../../../data/TokenType.ts";
import { ParserState } from "../ParserState.ts";
import { consumeFunction } from "./consumeFunction.ts";
import { consumeNumber } from "./consumeNumber.ts";
import { consumeString } from "./consumeString.ts";

const numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const numberSet = new Set(numberArray);

export function consumeExpression(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Expression,
    children: new Map(),
  };

  const first = state.peek();

  // function
  if (first.str === "fn") {
    node.children?.set("0", [consumeFunction(state)]);
  }
  // sub-expression
  else if (first.str === "(") {
    state.consume();
    node.children?.set("0", [consumeExpression(state)]);
    const last = state.pop();
    if (last.str !== ")") {
      throw new Error("Expected closing bracket, got: " + last);
    }
  }
  // string litteral
  else if (first.str === '"' || first.str === "'") {
    node.children?.set("0", [consumeString(state)]);
  }
  // number litteral
  else if (numberSet.has(first.str[0])) {
    node.children?.set("0", [consumeNumber(state)]);
  }
  // identifier
  else if (first.type === TokenType.Identifier) {
    state.consume();
    node.children?.set("0", [
      {
        type: AstNodeType.Identifier,
      },
    ]);
  }
  // todo?
  else {
    throw new Error("Unknown expression type: " + first.str);
  }

  return node;
}
