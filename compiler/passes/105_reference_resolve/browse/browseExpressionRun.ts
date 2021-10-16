import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionRun(
  scope: Scope,
  ast: AstExpressionRun,
  next: () => Promise<void>,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  for (const astClosure of resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }

  for (const astClosure of resolvedClosures) {
    scope.pushClosure(astClosure);
  }

  await next();
}
