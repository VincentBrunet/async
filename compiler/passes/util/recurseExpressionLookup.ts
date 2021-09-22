import { AstExpressionLookup } from "../../data/ast/AstExpressionLookup.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionLookup<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionLookup,
) {
  r.recurseExpression(p, ast.expression);
}
