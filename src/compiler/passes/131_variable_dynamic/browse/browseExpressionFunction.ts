import { AstExpressionFunction } from '../../../data/ast/AstExpressionFunction.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';
import { utilBrowseReferenceValueClosure } from '../util/utilBrowseReferenceValueClosure.ts';

export function browseExpressionFunction(
  ast: AstExpressionFunction,
  scope: Scope,
) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);
  // ValueClosures
  for (const referenceValueClosure of referenceValueClosures) {
    utilBrowseReferenceValueClosure(referenceValueClosure);
  }
}
