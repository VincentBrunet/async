import { Ast } from './Ast.ts';
import { AstAnnotationTemplate } from './AstAnnotationTemplate.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';
import { AstBlock } from './AstBlock.ts';
import { AstReferenceClosure } from './AstReferenceClosure.ts';
import { AstStatementReturn } from './AstStatementReturn.ts';
import { AstType } from './AstType.ts';

export interface AstExpressionFunctionParam extends Ast {
  name?: string;
  annotation: AstAnnotationType;

  resolvedType?: AstType;

  symbolLocalValue?: string;
}

export interface AstExpressionFunction extends Ast {
  template: AstAnnotationTemplate;
  params: Array<AstExpressionFunctionParam>;
  ret: AstAnnotationType;
  block: AstBlock;

  resolvedType?: AstType;
  resolvedTypeRet?: AstType;
  resolvedReturns?: Array<AstStatementReturn>;

  referenceClosures?: Array<AstReferenceClosure>;

  symbolGlobalCallableFunction?: string;
  symbolGlobalFactoryFunction?: string;
  symbolFileClosureStruct?: string;
  symbolLocalClosureValue?: string;
}
