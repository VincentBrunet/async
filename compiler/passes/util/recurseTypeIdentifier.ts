import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseTypeIdentifier<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeIdentifier,
) {
  for (const param of ast.params) {
    r.recurseType(p, param);
  }
}
