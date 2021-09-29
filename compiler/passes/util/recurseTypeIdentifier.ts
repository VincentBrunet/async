import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseTypeIdentifier<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeIdentifier,
) {
  for (const param of ast.params) {
    await r.recurseType(p, param);
  }
}
