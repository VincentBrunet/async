import { AstStatementImport } from '../../data/ast/AstStatementImport.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementImport(r: RecursorPass, ast: AstStatementImport) {
  r.recurseExpression(ast.url);
}
