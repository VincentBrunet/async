import { AstStatementVariable } from '../../data/ast/AstStatementVariable.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementVariable(r: RecursorPass, ast: AstStatementVariable) {
  r.recurseAnnotationType(ast.annotation);
  if (ast.value) {
    r.recurseExpression(ast.value);
  }
}
