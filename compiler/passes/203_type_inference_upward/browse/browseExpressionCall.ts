import { AstExpressionCall } from "../../../data/ast/AstExpressionCall.ts";
import { AstTypeKind } from "../../../data/ast/AstType.ts";
import { makeTypePrimitiveUnknown } from "../../../lib/typing/makeTypePrimitiveUnknown.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionCall(
  scope: Scope,
  ast: AstExpressionCall,
  next: () => void,
) {
  next();

  const calleeType = ast.callee.resolvedType;
  if (calleeType?.kind !== AstTypeKind.Function) {
    //throw new Error("Cannot call a value that's not a function");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.callee);
    return;
  }

  //const functionType = calleeType.data as AstTypeFunction;
  //ast.resolvedType = functionType.ret;

  ast.resolvedType = ast.callee.resolvedType; // TODO
}
