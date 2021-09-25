import { AstExpressionBinary } from "../../../data/ast/AstExpressionBinary.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionBinary(
  scope: BrowsedScope,
  ast: AstExpressionBinary,
  next: () => void,
) {
  next();

  ast.resolvedType = ast.expression2.resolvedType; // TODO
}
