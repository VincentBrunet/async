import { Ast } from "./Ast.ts";
import { AstTypeBinary } from "./AstTypeBinary.ts";
import { AstTypeFunction } from "./AstTypeFunction.ts";
import { AstTypeIdentifier } from "./AstTypeIdentifier.ts";
import { AstTypeObject } from "./AstTypeObject.ts";
import { AstTypeParenthesis } from "./AstTypeParenthesis.ts";
import { AstTypePrimitive } from "./AstTypePrimitive.ts";

export enum AstTypeKind {
  Parenthesis = "Parenthesis",
  Identifier = "Identifier",
  Primitive = "Primitive",
  Function = "Function",
  Object = "Object",
  Binary = "Binary",
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
