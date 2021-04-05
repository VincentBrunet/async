import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { TokenType } from "../../../data/TokenType.ts";
import { ParserState } from "../ParserState.ts";
import { consumeStatement } from "./consumeStatement.ts";

export function consumeBlock(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Block,
    children: new Map(),
  };

  const open = state.pop();
  if (open.str !== "{") {
    throw new Error("Expected a block open, got: " + open.str)
  }

  const statements = []

  while (true) {
    if (state.peek().str === "}") {
      state.consume()
      break
    }

    statements.push(consumeStatement(state))
  }

  node.children?.set("statements", statements)

  return node;
}
