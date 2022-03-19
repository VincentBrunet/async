import { AstStatementReturn } from '../../data/ast/AstStatementReturn.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementReturn(r: RecursorPass, ast: AstStatementReturn) {
  r.recurseAnnotationType(ast.annotation);
  r.recurseExpression(ast.value);
}
