import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";

export function browseExpressionRun(
  scope: BrowsedScope,
  ast: AstExpressionRun,
  next: () => void,
) {
  next();
  ast.closures = scope.readClosures();
}
