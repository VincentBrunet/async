import { AstStatementExport } from '../../data/ast/AstStatementExport.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementExport(r: RecursorPass, ast: AstStatementExport) {
  r.recurseStatement(ast.statement);
}
