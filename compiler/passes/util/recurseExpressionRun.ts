import { AstExpressionRun } from "../../data/ast/AstExpressionRun.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionRun<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionRun,
) {
  await r.recurseAnnotationType(p, ast.annotation);
  await r.recurseBlock(p, ast.block);
}
