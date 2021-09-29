import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionFunction(
  scope: BrowsedScope,
  ast: AstExpressionFunction,
  next: () => Promise<void>,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  for (const astClosure of resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }

  for (const astClosure of resolvedClosures) {
    scope.pushClosure(astClosure);
  }
  for (const astParam of ast.params) {
    if (astParam.name) {
      scope.pushParam(astParam);
    }
  }

  await next();
}
