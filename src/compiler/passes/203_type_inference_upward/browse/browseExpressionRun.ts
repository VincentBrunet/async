import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { makeTypeOrFromArray } from '../../../lib/typing/makeTypeOrFromArray.ts';
import { utilTypeForReferenceValueClosure } from '../util/utilTypeForReferenceValueClosure.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionRun(
  next: () => void,
  ast: AstExpressionRun,
  tracker: Tracker,
) {
  // Asserts
  const referenceValueClosures = ensure(ast.referenceValueClosures);
  const resolvedReturns = ensure(ast.resolvedReturns);

  // Resolve closure types
  for (const referenceValueClosure of referenceValueClosures) {
    referenceValueClosure.resolvedType = utilTypeForReferenceValueClosure(referenceValueClosure);
  }

  // Prep type before recursion
  ast.resolvedType = ast.annotation.type;

  // Recurse in run statements
  next();

  // Find all return types
  const returns = makeTypeOrFromArray(
    resolvedReturns.map((resolvedReturn) => ensure(resolvedReturn.resolvedType)),
    ast,
  );

  ast.resolvedType = ast.annotation.type ?? returns;
}
