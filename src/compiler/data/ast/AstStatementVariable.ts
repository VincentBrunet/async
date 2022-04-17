import { Ast } from './Ast.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';
import { AstExpression } from './AstExpression.ts';
import { AstType } from './AstType.ts';

export interface AstStatementVariable extends Ast {
  mutable: boolean;
  name: string;
  annotation: AstAnnotationType;
  value?: AstExpression;

  resolvedType?: AstType;
  resolvedHeapized?: boolean;

  symbolLocalVariable?: string;
}
