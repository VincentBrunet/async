import { AstTypeFunction } from '../../data/ast/AstTypeFunction.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseTypeFunction(r: RecursorPass, ast: AstTypeFunction) {
  for (const param of ast.params) {
    r.recurseType(param.type);
  }
  r.recurseType(ast.ret);
}
