import { AstBlock } from "./AstBlock.ts";
import { AstExpression } from "./expression/AstExpression.ts";

export interface AstWhile {
  condition: AstExpression;
  block: AstBlock;
}
