import { AstTypeBinary } from "./AstTypeBinary.ts";
import { AstTypeFunction } from "./AstTypeFunction.ts";
import { AstTypeIdentifier } from "./AstTypeIdentifier.ts";

export enum AstTypeKind {
  Identifier = "Identifier",
  Function = "Function",
  Binary = "Binary",
}

export type AstTypeData =
  | AstTypeIdentifier
  | AstTypeFunction
  | AstTypeBinary;

export interface AstType {
  kind: AstTypeKind;
  data: AstTypeData;
}
