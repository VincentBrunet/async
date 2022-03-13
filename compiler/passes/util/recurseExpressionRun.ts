import { AstExpressionRun } from "../../data/ast/AstExpressionRun.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionRun<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionRun,
) {
  r.recurseAnnotationType(p, ast.annotation);
  r.recurseBlock(p, ast.block);
}
