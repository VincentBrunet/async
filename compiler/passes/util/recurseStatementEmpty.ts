import { AstStatementEmpty } from "../../data/ast/AstStatementEmpty.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementEmpty<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementEmpty,
) {
}
