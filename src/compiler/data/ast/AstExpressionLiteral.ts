import { Ast } from './Ast.ts';
import { AstType } from './AstType.ts';
import { AstTypePrimitiveNative } from './AstTypePrimitive.ts';

export interface AstExpressionLiteral extends Ast {
  native: AstTypePrimitiveNative;
  value: string;

  resolvedType?: AstType;
}
