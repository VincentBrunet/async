import { AstStatementWhile } from "../../data/ast/AstStatementWhile.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementWhile<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementWhile,
) {
  r.recurseExpression(p, ast.condition);
  r.recurseBlock(p, ast.block);
}
