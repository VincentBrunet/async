import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionObject(
  next: () => void,
  ast: AstExpressionObject,
  scope: Scope,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);

  for (const astClosure of resolvedClosures) {
    astClosure.resolvedReference = scope.findReference(astClosure.name);
  }

  for (const astClosure of resolvedClosures) {
    scope.pushClosure(astClosure);
  }

  next();
}
