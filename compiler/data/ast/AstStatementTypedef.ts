import { Ast } from "./Ast.ts";
import { AstAnnotationTemplate } from "./AstAnnotationTemplate.ts";
import { AstType } from "./AstType.ts";

export interface AstStatementTypedef extends Ast {
  name: string;
  type: AstType;
  template: AstAnnotationTemplate;
}
