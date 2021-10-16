import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionObject(
  scope: Scope,
  ast: AstExpressionObject,
  next: () => Promise<void>,
) {
  await next();
  ast.resolvedClosures = scope.readClosures();
}
