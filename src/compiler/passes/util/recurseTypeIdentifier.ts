import { AstTypeIdentifier } from '../../data/ast/AstTypeIdentifier.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseTypeIdentifier(r: RecursorPass, ast: AstTypeIdentifier) {
  for (const param of ast.params) {
    r.recurseType(param);
  }
}
