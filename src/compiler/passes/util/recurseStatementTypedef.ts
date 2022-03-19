import { AstStatementTypedef } from '../../data/ast/AstStatementTypedef.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseStatementTypedef(r: RecursorPass, ast: AstStatementTypedef) {
  r.recurseAnnotationTemplate(ast.template);
  r.recurseType(ast.type);
}
