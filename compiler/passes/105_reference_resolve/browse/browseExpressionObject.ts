import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export async function browseExpressionObject(
  scope: BrowsedScope,
  ast: AstExpressionObject,
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
