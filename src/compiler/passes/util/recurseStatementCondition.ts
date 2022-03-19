import { AstStatementCondition } from '../../data/ast/AstStatementCondition.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementCondition(r: RecursorPass, ast: AstStatementCondition) {
  for (const branch of ast.branches) {
    r.recurseExpression(branch.condition);
    r.recurseBlock(branch.block);
  }
}
