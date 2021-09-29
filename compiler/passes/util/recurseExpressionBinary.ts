import { AstExpressionBinary } from "../../data/ast/AstExpressionBinary.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseExpressionBinary<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionBinary,
) {
  await r.recurseExpression(p, ast.expression1);
  await r.recurseExpression(p, ast.expression2);
}
