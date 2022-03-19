import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { makeTypeOrFromArray } from "../../../lib/typing/makeTypeOrFromArray.ts";
import { computeResolvedClosureType } from "../util/computeResolvedClosureType.ts";
import { Tracker } from "../util/Tracker.ts";

export function browseExpressionRun(
  next: () => void,
  ast: AstExpressionRun,
  tracker: Tracker,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);
  const resolvedReturns = ensure(ast.resolvedReturns);

  // Resolve closure types
  for (const closure of resolvedClosures) {
    closure.resolvedType = computeResolvedClosureType(closure);
  }

  // Prep type before recursion
  ast.resolvedType = ast.annotation.type;

  // Recurse in run statements
  next();

  // Find all return types
  const returns = makeTypeOrFromArray(
    resolvedReturns.map((resolvedReturn) =>
      ensure(resolvedReturn.resolvedType)
    ),
    ast,
  );

  ast.resolvedType = ast.annotation.type ?? returns;
}
