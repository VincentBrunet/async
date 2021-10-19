import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { makeTypeOrFromArray } from "../../../lib/typing/makeTypeOrFromArray.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionRun(
  scope: Scope,
  ast: AstExpressionRun,
  next: () => Promise<void>,
) {
  // Asserts
  const resolvedClosures = ensure(ast.resolvedClosures);
  const resolvedReturns = ensure(ast.resolvedReturns);

  // Resolve closure types
  for (const closure of resolvedClosures) {
    closure.resolvedType = ensure(closure.resolvedReference).data.resolvedType;
  }

  // Prep type before recursion
  ast.resolvedType = ast.annotation.type;

  // Recurse in run statements
  await next();

  // Find all return types
  const returns = makeTypeOrFromArray(
    resolvedReturns.map((resolvedReturn) =>
      ensure(resolvedReturn.resolvedType)
    ),
    ast,
  );

  ast.resolvedType = ast.annotation.type ?? returns;
}
