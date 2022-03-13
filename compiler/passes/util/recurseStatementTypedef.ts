import { AstStatementTypedef } from "../../data/ast/AstStatementTypedef.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseStatementTypedef<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstStatementTypedef,
) {
  r.recurseAnnotationTemplate(p, ast.template);
  r.recurseType(p, ast.type);
}
