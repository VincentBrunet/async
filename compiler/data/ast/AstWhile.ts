import { AstBlock } from "./AstBlock.ts";
import { AstExpression } from "./AstExpression.ts";

export interface AstWhile {
  expression: AstExpression;
  block: AstBlock;
}
