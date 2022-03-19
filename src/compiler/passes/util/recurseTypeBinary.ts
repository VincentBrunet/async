import { AstTypeBinary } from '../../data/ast/AstTypeBinary.ts';
import { RecursorPass } from './RecursorPass.ts';

export function recurseTypeBinary(r: RecursorPass, ast: AstTypeBinary) {
  r.recurseType(ast.type1);
  r.recurseType(ast.type2);
}
