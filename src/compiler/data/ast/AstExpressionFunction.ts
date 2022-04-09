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

export interface AstExpressionFunctionReturn extends Ast {
  annotation: AstAnnotationType;

  resolvedType?: AstType;
}

export interface AstExpressionFunction extends Ast {
  template: AstAnnotationTemplate;
  params: Array<AstExpressionFunctionParam>;
  ret: AstExpressionFunctionReturn;
  block: AstBlock;

  resolvedType?: AstType;

  collectedReturns?: Array<AstStatementReturn>;
  referenceClosures?: Array<AstReferenceClosure>;

  symbolGlobalCallableFunction?: string;
  symbolGlobalFactoryFunction?: string;
  symbolFileClosureStruct?: string;
  symbolLocalClosureValue?: string;
}
