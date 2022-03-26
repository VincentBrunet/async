import { Ast } from '../../data/ast/Ast.ts';
import { AstType, astTypeMakeObject } from '../../data/ast/AstType.ts';
import { AstTypeObjectField } from '../../data/ast/AstTypeObject.ts';

export function makeTypeObject(
  fields: Array<AstTypeObjectField>,
  source?: Ast,
): AstType {
  return astTypeMakeObject({
    fields: fields,
    token: source?.token,
  });
}
