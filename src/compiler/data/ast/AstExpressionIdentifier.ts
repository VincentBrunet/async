import { Ast } from './Ast.ts';
import { AstReferenceValue } from './AstReferenceValue.ts';
import { AstType } from './AstType.ts';

export interface AstExpressionIdentifier extends Ast {
  name: string;

  resolvedType?: AstType;
  resolvedReferenceValue?: AstReferenceValue;
}
