import { AstBlock } from "./AstBlock.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstStatementWhile {
  condition: AstExpression;
  block: AstBlock;
}
