import { Ast } from './Ast.ts';
import { AstType } from './AstType.ts';

export enum AstTypeBinaryOperator {
  And = 'And',
  Or = 'Or',
}

export interface AstTypeBinary extends Ast {
  operator: AstTypeBinaryOperator;
  type1: AstType;
  type2: AstType;
}

/*
export function astTypeBinaryMake(operator: AstTypeBinaryOperator, type1: AstType, type2: AstType) {
  return {
    operator: operator,
    type1: type1,
    type2: type2,
  };
}
*/
