import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { Scope } from '../util/Scope.ts';

export function browseExpressionRun(
  ast: AstExpressionRun,
  scope: Scope,
) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);

  // ValueClosures
  for (const referenceValueClosure of referenceValueClosures) {
    referenceValueClosure.resolvedReferenceValue = scope.findReferenceValue(referenceValueClosure.name);
  }
}
