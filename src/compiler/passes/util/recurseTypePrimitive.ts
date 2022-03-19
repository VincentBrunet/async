import { AstTypePrimitive } from '../../data/ast/AstTypePrimitive.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseTypePrimitive(r: RecursorPass, ast: AstTypePrimitive) {
  for (const param of ast.params) {
    r.recurseType(param);
  }
}
