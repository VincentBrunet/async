import { Ast } from '../../data/ast/Ast.ts';
import { AstAnnotationType } from '../../data/ast/AstAnnotationType.ts';
import { AstType } from '../../data/ast/AstType.ts';

export function makeAnnotationType(
  type?: AstType,
): AstAnnotationType {
  return {
    type: type,
    token: type?.token,
  };
}
