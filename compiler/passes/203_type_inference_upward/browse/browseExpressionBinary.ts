import { AstExpressionBinary } from "../../../data/ast/AstExpressionBinary.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionBinary(
  scope: BrowsedScope,
  ast: AstExpressionBinary,
  next: () => Promise<void>,
) {
  await next();

  ast.resolvedType = ast.expression2.resolvedType; // TODO
}
