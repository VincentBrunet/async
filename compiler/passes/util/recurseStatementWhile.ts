import { AstStatementWhile } from "../../data/ast/AstStatementWhile.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementWhile<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementWhile,
) {
  await r.recurseExpression(p, ast.condition);
  await r.recurseBlock(p, ast.block);
}
