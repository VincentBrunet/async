import { AstExpressionBinary } from "../../data/ast/AstExpressionBinary.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionBinary<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionBinary,
) {
  r.recurseExpression(p, ast.expression1);
  r.recurseExpression(p, ast.expression2);
}
