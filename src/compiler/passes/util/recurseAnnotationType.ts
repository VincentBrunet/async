import { AstAnnotationType } from '../../data/ast/AstAnnotationType.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseAnnotationType(r: RecursorPass, ast: AstAnnotationType) {
  if (ast.type) {
    r.recurseType(ast.type);
  }
}
