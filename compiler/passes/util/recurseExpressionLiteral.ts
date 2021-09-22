import { AstExpressionLiteral } from "../../data/ast/AstExpressionLiteral.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionLiteral<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionLiteral,
) {
}
