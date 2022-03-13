import { AstStatementCondition } from "../../data/ast/AstStatementCondition.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementCondition<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementCondition,
) {
  for (const branch of ast.branches) {
    r.recurseStatementConditionBranch(p, branch);
  }
}
