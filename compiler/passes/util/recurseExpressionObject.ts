import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionObject<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionObject,
) {
  await r.recurseAnnotationType(p, ast.annotation);
  for (const field of ast.fields) {
    await r.recurseAnnotationType(p, field.annotation);
    await r.recurseExpression(p, field.expression);
  }
}
