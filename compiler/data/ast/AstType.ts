import { Ast } from "./Ast.ts";
import { AstTypeBinary } from "./AstTypeBinary.ts";
import { AstTypeFunction } from "./AstTypeFunction.ts";
import { AstTypeIdentifier } from "./AstTypeIdentifier.ts";
import { AstTypeObject } from "./AstTypeObject.ts";
import { AstTypePrimitive } from "./AstTypePrimitive.ts";

export enum AstTypeKind {
  Identifier = "Identifier",
  Primitive = "Primitive",
  Function = "Function",
  Object = "Object",
  Binary = "Binary",
}

export type AstTypeData =
  | AstTypeIdentifier
  | AstTypePrimitive
  | AstTypeFunction
  | AstTypeObject
  | AstTypeBinary;

export interface AstType extends Ast {
  kind: AstTypeKind;
  data: AstTypeData;
}
