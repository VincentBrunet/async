import { AstTypeParenthesis } from "../../data/ast/AstTypeParenthesis.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseTypeParenthesis<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeParenthesis,
) {
  await r.recurseType(p, ast.type);
}
