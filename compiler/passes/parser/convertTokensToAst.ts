import { AstNode } from "../../data/AstNode.ts";
import { Token } from "../../data/Token.ts";
import { consumeModule } from "./consume/consumeModule.ts";
import { ParserState } from "./ParserState.ts";

export function convertTokensToAst(tokens: Token[]): AstNode {
  const state = new ParserState(tokens);
  return consumeModule(state);
}
