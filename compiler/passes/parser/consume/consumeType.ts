import { AstNode } from "../../../data/AstNode.ts";
import { AstNodeType } from "../../../data/AstNodeType.ts";
import { TokenType } from "../../../data/TokenType.ts";
import { ParserState } from "../ParserState.ts";

export function consumeType(state: ParserState): AstNode {
  const node: AstNode = {
    type: AstNodeType.Type,
  };

  // TODO
  state.pop()

  return node;
}
