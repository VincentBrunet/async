import { AstExpressionLookup } from '../../../data/ast/AstExpressionLookup.ts';
import { astTypeAsObject } from '../../../data/ast/AstType.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { makeTypePrimitiveUnknown } from '../../../lib/typing/makeTypePrimitiveUnknown.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionLookup(
  next: () => void,
  ast: AstExpressionLookup,
  tracker: Tracker,
) {
  next();

  const objectType = astTypeAsObject(ensure(ast.expression.resolvedType));
  if (!objectType) {
    //throw new Error("Cannot do a lookup on a value that is not an object");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.expression);
    return;
  }

  const resolvedFields = ensure(objectType.resolvedFields);
  ast.resolvedType = resolvedFields.get(ast.name)?.type;

  if (ast.resolvedType === undefined) {
    //throw new Error("Cannot do a lookup on a value that is not an object");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.expression);
  }
}
