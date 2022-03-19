import { AstExpressionLookup } from '../../../data/ast/AstExpressionLookup.ts';
import { AstTypeKind } from '../../../data/ast/AstType.ts';
import { AstTypeObject } from '../../../data/ast/AstTypeObject.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { makeTypePrimitiveUnknown } from '../../../lib/typing/makeTypePrimitiveUnknown.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionLookup(
  next: () => void,
  ast: AstExpressionLookup,
  tracker: Tracker,
) {
  next();

  const objectType = ast.expression.resolvedType;
  if (objectType === undefined) {
    return;
  }

  if (objectType.kind !== AstTypeKind.Object) {
    //throw new Error("Cannot do a lookup on a value that is not an object");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.expression);
    return;
  }

  const objectTypeData = (objectType.data as AstTypeObject);
  const resolvedFields = ensure(objectTypeData.resolvedFields);
  ast.resolvedType = resolvedFields.get(ast.name)?.type;

  if (ast.resolvedType === undefined) {
    //throw new Error("Cannot do a lookup on a value that is not an object");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.expression);
  }
}
