import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export function browseExpressionRun(
  next: () => void,
  ast: AstExpressionRun,
  scope: Scope,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  for (const astClosure of resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }

  for (const astClosure of resolvedClosures) {
    scope.pushClosure(astClosure);
  }

  next();
}
