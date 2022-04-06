import { Ast } from './Ast.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';

export interface AstTypeFunctionParam extends Ast {
  name?: string;
  annotation: AstAnnotationType;
}

export interface AstTypeFunctionReturn extends Ast {
  annotation: AstAnnotationType;
}

export interface AstTypeFunction extends Ast {
  params: Array<AstTypeFunctionParam>;
  ret: AstTypeFunctionReturn;
}
