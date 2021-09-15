import { AstBlock } from "./AstBlock.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstWhile {
  condition: AstExpression;
  block: AstBlock;
}
