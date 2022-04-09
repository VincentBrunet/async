import { Ast } from './Ast.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';
import { AstBlock } from './AstBlock.ts';
import { AstReferenceClosure } from './AstReferenceClosure.ts';
import { AstStatementReturn } from './AstStatementReturn.ts';
import { AstType } from './AstType.ts';

export interface AstExpressionRun extends Ast {
  annotation: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;

  collectedReturns?: Array<AstStatementReturn>;
  referenceClosures?: Array<AstReferenceClosure>;

  symbolGlobalCallableFunction?: string;
}
