import { Ast } from './Ast.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';
import { AstExpression } from './AstExpression.ts';
import { AstReferenceClosure } from './AstReferenceClosure.ts';
import { AstType } from './AstType.ts';

export interface AstExpressionObjectField extends Ast {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotationType;
  expression: AstExpression;

  symbolLocalValue?: string;
}

export interface AstExpressionObject extends Ast {
  annotation: AstAnnotationType;
  fields: Array<AstExpressionObjectField>;

  resolvedType?: AstType;

  referenceClosures?: Array<AstReferenceClosure>;

  symbolGlobalCallableFunction?: string;
  symbolFileFieldsStatic?: string;
  symbolLocalFieldsValue?: string;
}
