import { AstTypeIdentifier } from "../../data/ast/AstTypeIdentifier.ts";

export function recurseTypeIdentifier<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstTypeIdentifier,
) {
  for (const param of ast.params) {
    r.recurseType(p, param);
  }
}
