import { AstAnnotationTemplate } from "./AstAnnotationTemplate.ts";
import { AstType } from "./AstType.ts";

export interface AstStatementTypedef {
  name: string;
  type: AstType;
  template: AstAnnotationTemplate;
}
