import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionObject<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionObject,
) {
  r.recurseAnnotationType(p, ast.annotation);
  for (const field of ast.fields) {
    r.recurseAnnotationType(p, field.annotation);
    r.recurseExpression(p, field.expression);
  }
}
