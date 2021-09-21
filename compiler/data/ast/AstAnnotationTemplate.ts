import { AstAnnotationType } from "./AstAnnotationType.ts";

export interface AstAnnotationTemplateParam {
  name: string;
  annotation: AstAnnotationType;
}

export interface AstAnnotationTemplate {
  params: Array<AstAnnotationTemplateParam>;
}
