import { AstExpressionObject } from "../../../data/ast/AstExpressionObject.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionObject(
  scope: Scope,
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
