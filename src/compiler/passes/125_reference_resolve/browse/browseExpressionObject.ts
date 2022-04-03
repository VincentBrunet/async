import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionObject(
  ast: AstExpressionObject,
  scope: Scope,
) {
  // Asserts
  const referenceClosures = ensure(ast.referenceClosures);

  // Closures (resolve and declare)
  for (const referenceClosure of referenceClosures) {
    referenceClosure.resolvedReferenceValue = scope.findReferenceValue(referenceClosure.name);
  }
  for (const referenceClosure of referenceClosures) {
    scope.pushReferenceClosure(referenceClosure);
  }
}
