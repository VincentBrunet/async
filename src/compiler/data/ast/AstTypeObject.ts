import { Ast } from './Ast.ts';
import { AstAnnotationType } from './AstAnnotationType.ts';

export interface AstTypeObjectField extends Ast {
  mutable: boolean;
  name: string;
  hash: string;
  annotation: AstAnnotationType;
}

export interface AstTypeObject extends Ast {
  fields: Array<AstTypeObjectField>;

  resolvedFields?: Map<string, AstTypeObjectField>;
}
