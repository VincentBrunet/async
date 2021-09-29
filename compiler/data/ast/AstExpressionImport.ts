import { Ast } from "./Ast.ts";
import { AstExpression } from "./AstExpression.ts";
import { AstModule } from "./AstModule.ts";
import { AstType } from "./AstType.ts";

export interface AstExpressionImport extends Ast {
  expression: AstExpression;

  resolvedType?: AstType;
  resolvedModule?: AstModule;
}
