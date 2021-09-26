import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { makeTypeOr } from "../../../lib/typing/makeTypeOr.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionRun(
  scope: BrowsedScope,
  ast: AstExpressionRun,
  next: () => void,
) {
  ast.resolvedType = ast.annotation.type;
  if (ast.resolvedClosures) {
    for (const closure of ast.resolvedClosures) {
      closure.resolvedType = closure.resolvedReference?.data.resolvedType;
    }
  }

  next();

  const returns = ast.resolvedReturns ?? [];
  let current = returns[0]?.expression.resolvedType;
  for (let i = 1; i < returns.length; i++) {
    const next = returns[i].expression.resolvedType;
    if (current && next) {
      current = makeTypeOr(current, next, ast);
    }
  }
  ast.resolvedType = ast.annotation.type ?? current;
}
