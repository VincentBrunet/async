import { AstNodeType } from "./AstNodeType.ts";

export interface AstNode {
  type: AstNodeType;
  children?: Map<string, AstNode[]>;
  metas?: Map<string, string>;
}
