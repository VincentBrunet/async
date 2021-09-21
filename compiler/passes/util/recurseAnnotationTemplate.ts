import { AstAnnotationTemplate } from "../../data/ast/AstAnnotationTemplate.ts";
import { AstRecursor } from "./AstRecursor.ts";

export function recurseAnnotationTemplate<Param>(
  r: AstRecursor<Param>,
  p: Param,
  ast: AstAnnotationTemplate,
) {
  for (const param of ast.params) {
    r.recurseAnnotationType(r, p, param.annotation);
  }
}
