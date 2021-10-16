import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionRun(
  scope: Scope,
  ast: AstExpressionRun,
  next: () => Promise<void>,
) {
  await next();
  ast.resolvedClosures = scope.readClosures();
}
