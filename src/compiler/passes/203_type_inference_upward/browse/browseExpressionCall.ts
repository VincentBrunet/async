import { AstExpressionCall } from '../../../data/ast/AstExpressionCall.ts';
import { AstTypeKind } from '../../../data/ast/AstType.ts';
import { AstTypeFunction } from '../../../data/ast/AstTypeFunction.ts';
import { makeTypePrimitiveUnknown } from '../../../lib/typing/makeTypePrimitiveUnknown.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionCall(
  next: () => void,
  ast: AstExpressionCall,
  tracker: Tracker,
) {
  next();

  const calleeType = ast.callee.resolvedType;
  if (calleeType === undefined) {
    return;
  }

  if (calleeType.kind !== AstTypeKind.Function) {
    //throw new Error("Cannot call a value that's not a function");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.callee);
    return;
  }

  ast.resolvedType = (calleeType.data as AstTypeFunction).ret;
}
