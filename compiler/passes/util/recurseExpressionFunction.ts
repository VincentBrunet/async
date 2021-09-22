import { AstExpressionFunction } from "../../data/ast/AstExpressionFunction.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseExpressionFunction<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstExpressionFunction,
) {
  r.recurseAnnotationTemplate(p, ast.template);
  for (const param of ast.params) {
    r.recurseAnnotationType(p, param.annotation);
  }
  r.recurseAnnotationType(p, ast.return);
  r.recurseBlock(p, ast.block);
}
