import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionRun(
  ast: AstExpressionRun,
  scope: Scope,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Closures (resolve and declare)
  for (const astClosure of resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }
  for (const astClosure of resolvedClosures) {
    scope.pushClosure(astClosure);
  }
}
