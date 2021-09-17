import { AstTypeBinary } from "./AstTypeBinary.ts";
import { AstTypeFunction } from "./AstTypeFunction.ts";
import { AstTypeIdentifier } from "./AstTypeIdentifier.ts";
import { AstTypeObject } from "./AstTypeObject.ts";

export enum AstTypeKind {
  Identifier = "Identifier",
  Function = "Function",
  Object = "Object",
  Binary = "Binary",
}

export type AstTypeData =
  | AstTypeIdentifier
  | AstTypeFunction
  | AstTypeObject
  | AstTypeBinary;

export interface AstType {
  kind: AstTypeKind;
  data: AstTypeData;
}
