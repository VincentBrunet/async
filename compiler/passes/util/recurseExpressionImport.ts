import { AstExpressionImport } from "../../data/ast/AstExpressionImport.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionImport<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionImport,
) {
  await r.recurseExpression(p, ast.expression);
}
