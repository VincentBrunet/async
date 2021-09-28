import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionObject<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionObject,
) {
  for (const field of ast.fields) {
    r.recurseExpression(p, field.expression);
  }
}
