import { Ast } from './Ast.ts';
import { AstBlock } from './AstBlock.ts';
import { AstExpression } from './AstExpression.ts';

export interface AstStatementConditionBranch extends Ast {
  condition: AstExpression;
  block: AstBlock;
}

export interface AstStatementCondition extends Ast {
  branches: Array<AstStatementConditionBranch>;
}
