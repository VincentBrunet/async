import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { makeTypeOr } from "../../../lib/typing/makeTypeOr.ts";
import { Scope } from "../util/Scope.ts";

export async function browseExpressionRun(
  scope: Scope,
  ast: AstExpressionRun,
  next: () => Promise<void>,
) {
  ast.resolvedType = ast.annotation.type;
  if (ast.resolvedClosures) {
    for (const closure of ast.resolvedClosures) {
      closure.resolvedType = closure.resolvedReference?.data.resolvedType;
    }
  }

  await next();

  const returns = ast.resolvedReturns ?? [];
  let current = returns[0]?.resolvedType;
  for (let i = 1; i < returns.length; i++) {
    const next = returns[i].resolvedType;
    if (current && next) {
      current = makeTypeOr(current, next, ast);
    }
  }
  ast.resolvedType = ast.annotation.type ?? current;
}
