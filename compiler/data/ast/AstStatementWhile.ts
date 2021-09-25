import { Ast } from "./Ast.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementWhile extends Ast {
  condition: AstExpression;
  block: AstBlock;
}
