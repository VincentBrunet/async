import { Ast } from './Ast.ts';
import { AstReferenceType } from './AstReferenceType.ts';
import { AstType } from './AstType.ts';

export interface AstTypeIdentifier extends Ast {
  name: string;
  params: Array<AstType>;

  resolvedReferenceType?: AstReferenceType;
}
