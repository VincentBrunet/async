import { Ast } from './Ast.ts';
import { AstReferenceValue } from './AstReferenceValue.ts';
import { AstType } from './AstType.ts';

export interface AstReferenceClosure extends Ast {
  name: string;

  resolvedType?: AstType;
  resolvedReferenceValue?: AstReferenceValue;

  symbolLocalParam?: string;
  symbolLocalValue?: string;
}
