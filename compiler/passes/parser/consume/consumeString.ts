import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { ParserState } from "../ParserState.ts";

export function consumeString(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.String,
    children: new Map(),
  };

  return node;
}
