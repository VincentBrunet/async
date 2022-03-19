import { Ast } from "./Ast.ts";
import { AstAnnotationType } from "./AstAnnotationType.ts";

export interface AstAnnotationTemplateParam extends Ast {
  name: string;
  annotation: AstAnnotationType;
}

export interface AstAnnotationTemplate extends Ast {
  params: Array<AstAnnotationTemplateParam>;
}
