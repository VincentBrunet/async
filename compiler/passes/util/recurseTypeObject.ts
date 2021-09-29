import { AstTypeObject } from "../../data/ast/AstTypeObject.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseTypeObject<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeObject,
) {
  for (const field of ast.fields) {
    await r.recurseType(p, field.type);
  }
}
