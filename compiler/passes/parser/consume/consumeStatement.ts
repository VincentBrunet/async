import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { TokenType } from "../../../data/TokenType.ts";
import { ParserState } from "../ParserState.ts";
import { consumeExpression } from "./consumeExpression.ts";
import { consumeVariable } from "./consumeVariable.ts";

const variableSet = new Set(["const", "mutable"]);

export function consumeStatement(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Statement,
    children: new Map(),
  };

  const first = state.peek();
  if (first.type === TokenType.Identifier) {
    if (variableSet.has(first.str)) {
      node.children?.set("inner", [consumeVariable(state)]);
      return node;
    }
  }

  node.children?.set("inner", [consumeExpression(state)]);
  return node;
}
