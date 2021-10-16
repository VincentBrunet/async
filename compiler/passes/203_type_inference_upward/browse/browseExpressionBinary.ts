import { AstExpressionBinary } from "../../../data/ast/AstExpressionBinary.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionBinary(
  scope: Scope,
  ast: AstExpressionBinary,
  next: () => Promise<void>,
) {
  await next();

  ast.resolvedType = ast.expression2.resolvedType; // TODO
}
