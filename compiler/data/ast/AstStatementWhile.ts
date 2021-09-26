import { Ast } from "./Ast.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export interface AstStatementWhile extends Ast {
  condition: AstExpression;
  block: AstBlock;

  resolvedVariables?: Array<AstStatementVariable>;
}
