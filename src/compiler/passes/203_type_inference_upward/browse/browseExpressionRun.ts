import { AstExpressionRun } from '../../../data/ast/AstExpressionRun.ts';
import { ensure } from '../../../passes/errors/ensure.ts';
import { makeTypeOrFromArray } from '../../../lib/typing/makeTypeOrFromArray.ts';
import { utilTypeForReferenceClosure } from '../util/utilTypeForReferenceClosure.ts';
import { Tracker } from '../util/Tracker.ts';

export function browseExpressionRun(
  next: () => void,
  ast: AstExpressionRun,
  tracker: Tracker,
) {
  // Asserts
  const referenceClosures = ensure(ast.referenceClosures);
  const collectedReturns = ensure(ast.collectedReturns);

  // Resolve closure types
  for (const referenceClosure of referenceClosures) {
    referenceClosure.resolvedType = utilTypeForReferenceClosure(referenceClosure);
  }

  // Prep type before recursion
  ast.resolvedType = ast.annotation.type;

  // Recurse in run statements
  next();

  // Find all return types
  const returns = makeTypeOrFromArray(
    collectedReturns.map((resolvedReturn) => ensure(resolvedReturn.resolvedType)),
    ast,
  );

  ast.resolvedType = ast.annotation.type ?? returns;
}
