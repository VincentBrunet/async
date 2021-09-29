import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionObject<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionObject,
) {
  for (const field of ast.fields) {
    await r.recurseExpression(p, field.expression);
  }
}
