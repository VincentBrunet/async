import { Ast } from './Ast.ts';
import { AstReferenceValue } from './AstReferenceValue.ts';
import { AstType } from './AstType.ts';

export interface AstReferenceClosure extends Ast {
  idx: number;
  name: string;

  resolvedType?: AstType;
  resolvedReferenceValue?: AstReferenceValue;

  symbolLocalValue?: string;
}
