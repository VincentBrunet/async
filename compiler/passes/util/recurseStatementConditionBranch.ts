import { AstStatementConditionBranch } from "../../data/ast/AstStatementCondition.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementConditionBranch<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementConditionBranch,
) {
  await r.recurseExpression(p, ast.condition);
  await r.recurseBlock(p, ast.block);
}
