import { AstAnnotationType } from "../../data/ast/AstAnnotationType.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseAnnotationType<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstAnnotationType,
) {
  if (ast.type) {
    await r.recurseType(p, ast.type);
  }
}
