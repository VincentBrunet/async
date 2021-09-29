import { AstAnnotationTemplate } from "../../data/ast/AstAnnotationTemplate.ts";
import { RecursorPass } from "./RecursorPass.ts";

export async function recurseAnnotationTemplate<Scope>(
  r: RecursorPass<Scope>,
  p: Scope,
  ast: AstAnnotationTemplate,
) {
  for (const param of ast.params) {
    await r.recurseAnnotationType(p, param.annotation);
  }
}
