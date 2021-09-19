import { AstType } from "./AstType.ts";

export interface AstTypeIdentifier {
  name: string;
  templates: Array<AstType>;
  //resolved?: AstType;
}
