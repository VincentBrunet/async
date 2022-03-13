import { AstTypeObject } from "../../data/ast/AstTypeObject.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseTypeObject<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeObject,
) {
  for (const field of ast.fields) {
    r.recurseType(p, field.type);
  }
}
