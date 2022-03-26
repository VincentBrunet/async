import { AstExpressionObject } from '../../../data/ast/AstExpressionObject.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionObject(
  ast: AstExpressionObject,
  scope: Scope,
) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);

  // ValueClosures (resolve and declare)
  for (const referenceValueClosure of referenceValueClosures) {
    referenceValueClosure.resolvedReferenceValue = scope.findReferenceValue(referenceValueClosure.name);
  }
  for (const referenceValueClosure of referenceValueClosures) {
    scope.pushReferenceValueClosure(referenceValueClosure);
  }
}
