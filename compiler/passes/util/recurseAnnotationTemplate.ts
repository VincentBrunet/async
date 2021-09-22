import { AstAnnotationTemplate } from "../../data/ast/AstAnnotationTemplate.ts";
import { RecursorPass } from "./RecursorPass.ts";

export function recurseAnnotationTemplate<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstAnnotationTemplate,
) {
  for (const param of ast.params) {
    r.recurseAnnotationType(p, param.annotation);
  }
}
