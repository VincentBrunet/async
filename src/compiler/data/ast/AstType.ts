import { Ast } from './Ast.ts';
import { AstTypeBinary } from './AstTypeBinary.ts';
import { AstTypeFunction } from './AstTypeFunction.ts';
import { AstTypeIdentifier } from './AstTypeIdentifier.ts';
import { AstTypeObject } from './AstTypeObject.ts';
import { AstTypeParenthesis } from './AstTypeParenthesis.ts';
import { AstTypePrimitive } from './AstTypePrimitive.ts';

export enum AstTypeKind {
  Parenthesis = 'Parenthesis',
  Identifier = 'Identifier',
  Primitive = 'Primitive',
  Function = 'Function',
  Object = 'Object',
  Binary = 'Binary',
}

export type AstTypeData =
  | AstTypeParenthesis
  | AstTypeIdentifier
  | AstTypePrimitive
  | AstTypeFunction
  | AstTypeObject
  | AstTypeBinary;

export interface AstType extends Ast {
  kind: AstTypeKind;
  data: AstTypeData;
}

export function astTypeMakePrimitive(astType: AstTypePrimitive): AstType {
  return {
    kind: AstTypeKind.Primitive,
    data: astType,
    token: astType.token,
  };
}

export function astTypeMakeFunction(astType: AstTypeFunction): AstType {
  return {
    kind: AstTypeKind.Function,
    data: astType,
    token: astType.token,
  };
}

export function astTypeMakeObject(astType: AstTypeObject): AstType {
  return {
    kind: AstTypeKind.Object,
    data: astType,
    token: astType.token,
  };
}

export function astTypeMakeBinary(astType: AstTypeBinary): AstType {
  return {
    kind: AstTypeKind.Binary,
    data: astType,
    token: astType.token,
  };
}

function astTypeRecurseParenthesis(astType: AstType): AstType {
  if (astType.kind === AstTypeKind.Parenthesis) {
    return (astType.data as AstTypeParenthesis).type;
  } else {
    return astType;
  }
}

export function astTypeAsIdentifier(astType: AstType): AstTypeIdentifier | undefined {
  astType = astTypeRecurseParenthesis(astType);
  if (astType.kind === AstTypeKind.Identifier) {
    return astType.data as AstTypeIdentifier;
  }
  return undefined;
}

export function astTypeAsPrimitive(astType: AstType): AstTypePrimitive | undefined {
  astType = astTypeRecurseParenthesis(astType);
  if (astType.kind === AstTypeKind.Primitive) {
    return astType.data as AstTypePrimitive;
  }
  return undefined;
}

export function astTypeAsFunction(astType: AstType): AstTypeFunction | undefined {
  astType = astTypeRecurseParenthesis(astType);
  if (astType.kind === AstTypeKind.Function) {
    return astType.data as AstTypeFunction;
  }
  return undefined;
}

export function astTypeAsObject(astType: AstType): AstTypeObject | undefined {
  astType = astTypeRecurseParenthesis(astType);
  if (astType.kind === AstTypeKind.Object) {
    return astType.data as AstTypeObject;
  }
  return undefined;
}

export function astTypeAsBinary(astType: AstType): AstTypeBinary | undefined {
  astType = astTypeRecurseParenthesis(astType);
  if (astType.kind === AstTypeKind.Binary) {
    return astType.data as AstTypeBinary;
  }
  return undefined;
}
