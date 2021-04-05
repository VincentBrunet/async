import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { ParserState } from "../ParserState.ts";
import { consumeStatement } from "./consumeStatement.ts";

export function consumeModule(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Module,
    children: new Map(),
  };

  const statements: AstNode[] = []
  while (!state.empty()) {
    statements.push(consumeStatement(state));
  }
  node.children?.set("statements", statements)

  return node;
}
