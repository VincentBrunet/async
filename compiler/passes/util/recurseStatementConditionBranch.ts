import { AstStatementConditionBranch } from "../../data/ast/AstStatementCondition.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementConditionBranch<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementConditionBranch,
) {
  r.recurseExpression(p, ast.condition);
  r.recurseBlock(p, ast.block);
}
