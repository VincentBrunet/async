import { AstTypeBinary } from "./AstTypeBinary.ts";
import { AstTypeIdentifier } from "./AstTypeIdentifier.ts";

export enum AstTypeKind {
  Identifier = "Identifier",
  Binary = "Binary",
}

export type AstTypeData =
  | AstTypeIdentifier
  | AstTypeBinary;

export interface AstType {
  kind: AstTypeKind;
  data: AstTypeData;
}
