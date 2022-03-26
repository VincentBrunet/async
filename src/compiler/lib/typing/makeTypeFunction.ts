import { Ast } from '../../data/ast/Ast.ts';
import { AstType, astTypeMakeFunction } from '../../data/ast/AstType.ts';
import { AstTypeFunctionParam } from '../../data/ast/AstTypeFunction.ts';

export function makeTypeFunction(
  params: Array<AstTypeFunctionParam>,
  ret: AstType,
  source?: Ast,
): AstType {
  return astTypeMakeFunction({
    params: params,
    ret: ret,
    token: source?.token,
  });
}
