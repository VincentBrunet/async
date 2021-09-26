import { AstExpressionCall } from "../../../data/ast/AstExpressionCall.ts";
import { AstTypeKind } from "../../../data/ast/AstType.ts";
import { makeTypePrimitiveUnknown } from "../../../lib/typing/makeTypePrimitiveUnknown.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionCall(
  scope: BrowsedScope,
  ast: AstExpressionCall,
  next: () => void,
) {
  next();

  const calleeType = ast.callee.resolvedType;
  if (calleeType?.kind !== AstTypeKind.Function) {
    //throw new Error("Cannot call a value that's not a function");
    ast.resolvedType = makeTypePrimitiveUnknown(ast.callee);
  }

  //const functionType = calleeType.data as AstTypeFunction;
  //ast.resolvedType = functionType.ret;

  ast.resolvedType = ast.callee.resolvedType; // TODO
}
