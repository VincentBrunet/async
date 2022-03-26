import { Ast } from '../../data/ast/Ast.ts';
import { AstType, astTypeMakeBinary } from '../../data/ast/AstType.ts';
import { AstTypeBinaryOperator } from '../../data/ast/AstTypeBinary.ts';

export function makeTypeOr(
  type1: AstType,
  type2: AstType,
  source?: Ast,
): AstType {
  return astTypeMakeBinary({
    operator: AstTypeBinaryOperator.Or,
    type1: type1,
    type2: type2,
    token: source?.token,
  });
}
