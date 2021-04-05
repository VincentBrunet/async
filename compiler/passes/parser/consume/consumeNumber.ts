import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { ParserState } from "../ParserState.ts";

export function consumeNumber(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Number,
    children: new Map(),
  };

  return node;
}
