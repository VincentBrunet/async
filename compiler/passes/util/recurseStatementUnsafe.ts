import { AstStatementUnsafe } from "../../data/ast/AstStatementUnsafe.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementUnsafe<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementUnsafe,
) {
}
