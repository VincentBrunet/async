import { Ast } from "./Ast.ts";
import { AstBlock } from "./AstBlock.ts";

export interface AstStatementBlock extends Ast {
  block: AstBlock;
}
