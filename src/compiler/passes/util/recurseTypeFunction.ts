import { AstTypeFunction } from '../../data/ast/AstTypeFunction.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseTypeFunction(r: RecursorPass, ast: AstTypeFunction) {
  for (const param of ast.params) {
    r.recurseAnnotationType(param.annotation);
  }
  r.recurseAnnotationType(ast.ret.annotation);
}
