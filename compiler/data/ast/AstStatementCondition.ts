import { Ast } from "./Ast.ts";
import { AstBlock } from "./AstBlock.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstStatementVariable } from "./AstStatementVariable.ts";

export interface AstStatementConditionBranch extends Ast {
  condition: AstExpression;
  block: AstBlock;

  resolvedVariables?: Array<AstStatementVariable>;
}

export interface AstStatementCondition extends Ast {
  branches: Array<AstStatementConditionBranch>;
}
