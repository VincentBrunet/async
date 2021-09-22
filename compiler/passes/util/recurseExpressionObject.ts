import { AstExpressionObject } from "../../data/ast/AstExpressionObject.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionObject<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionObject,
) {
  r.recurseAnnotationType(p, ast.annotation);
  r.recurseBlock(p, ast.block);
}
