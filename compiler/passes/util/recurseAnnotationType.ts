import { AstAnnotationType } from "../../data/ast/AstAnnotationType.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseAnnotationType<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstAnnotationType,
) {
  if (ast.type) {
    r.recurseType(p, ast.type);
  }
}
