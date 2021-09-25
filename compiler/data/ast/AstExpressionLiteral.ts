import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";
import { AstTypePrimitiveId } from "./AstTypePrimitive.ts";

export interface AstExpressionLiteral extends Ast {
  id: AstTypePrimitiveId;
  value: string;

  resolvedType?: AstType;
}
