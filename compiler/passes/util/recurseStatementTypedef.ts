import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseStatementTypedef<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementTypedef,
) {
  await r.recurseAnnotationTemplate(p, ast.template);
  await r.recurseType(p, ast.type);
}
