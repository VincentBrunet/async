import { Ast } from './Ast.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';
import { AstExpression } from './AstExpression.ts';
import { AstReferenceValueClosure } from './AstReferenceValueClosure.ts';
import { AstType } from './AstType.ts';

export interface AstExpressionObjectField extends Ast {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotationType;
  expression: AstExpression;
}

export interface AstExpressionObject extends Ast {
  annotation: AstAnnotationType;
  fields: Array<AstExpressionObjectField>;

  resolvedType?: AstType;

  referenceValueClosures?: Array<AstReferenceValueClosure>;
}
