import { AstExpressionCall } from '../../../data/ast/AstExpressionCall.ts';
import { astTypeAsFunction } from '../../../data/ast/AstType.ts';
import { makeTypePrimitiveUnknown } from '../../../lib/typing/makeTypePrimitiveUnknown.ts';
import { ensure } from '../../errors/ensure.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionCall(
  next: () => void,
  ast: AstExpressionCall,
  tracker: Tracker,
) {
  next();

  const typeFunction = astTypeAsFunction(ensure(ast.callee.resolvedType));
  if (!typeFunction) {
    //throw new Error("Cannot call a value that's not a function");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.callee);
    return;
  }

  ast.resolvedType = typeFunction.ret;
}
