import { AstExpressionLookup } from "../../data/ast/AstExpressionLookup.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionLookup<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionLookup,
) {
  await r.recurseExpression(p, ast.expression);
}
