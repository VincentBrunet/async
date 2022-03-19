import { AstTypeObject } from '../../data/ast/AstTypeObject.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseTypeObject(r: RecursorPass, ast: AstTypeObject) {
  for (const field of ast.fields) {
    r.recurseType(field.type);
  }
}
