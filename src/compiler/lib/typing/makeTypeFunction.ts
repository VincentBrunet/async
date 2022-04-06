import { Ast } from '../../data/ast/Ast.ts';
import { AstType, astTypeMakeFunction } from '../../data/ast/AstType.ts';
import { AstTypeFunctionParam, AstTypeFunctionReturn } from '../../data/ast/AstTypeFunction.ts';

export function makeTypeFunction(
  params: Array<AstTypeFunctionParam>,
  ret: AstTypeFunctionReturn,
  source?: Ast,
): AstType {
  return astTypeMakeFunction({
    params: params,
    ret: ret,
    token: source?.token,
  });
}
