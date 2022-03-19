import { AstStatementConditionBranch } from '../../data/ast/AstStatementCondition.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementConditionBranch(r: RecursorPass, ast: AstStatementConditionBranch) {
  r.recurseExpression(ast.condition);
  r.recurseBlock(ast.block);
}
