import { AstStatementExpression } from '../../data/ast/AstStatementExpression.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementExpression(r: RecursorPass, ast: AstStatementExpression) {
  r.recurseExpression(ast.expression);
}
