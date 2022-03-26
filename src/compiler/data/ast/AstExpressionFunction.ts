import { Ast } from './Ast.ts';
import { AstAnnotationTemplate } from './AstAnnotationTemplate.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';
import { AstBlock } from './AstBlock.ts';
import { AstReferenceValueClosure } from './AstReferenceValueClosure.ts';
import { AstStatementReturn } from './AstStatementReturn.ts';
import { AstType } from './AstType.ts';

export interface AstExpressionFunctionParam extends Ast {
  name?: string;
  annotation: AstAnnotationType;

  resolvedType?: AstType;
}

export interface AstExpressionFunction extends Ast {
  template: AstAnnotationTemplate;
  params: Array<AstExpressionFunctionParam>;
  ret: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;
  resolvedTypeRet?: AstType;
  resolvedReturns?: Array<AstStatementReturn>;

  referenceValueClosures?: Array<AstReferenceValueClosure>;
}
