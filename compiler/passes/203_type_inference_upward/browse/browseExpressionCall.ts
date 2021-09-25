import { AstExpressionCall } from "../../../data/ast/AstExpressionCall.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionCall(
  scope: BrowsedScope,
  ast: AstExpressionCall,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.callee.resolvedType; // TODO
}
