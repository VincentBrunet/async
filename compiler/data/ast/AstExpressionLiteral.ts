import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export enum AstExpressionLiteralKind {
  String = "String", // TODO
  Boolean = "Boolean",
  Null = "Null",
  Integer8 = "Integer8",
  Integer16 = "Integer16",
  Integer32 = "Integer32",
  Integer64 = "Integer64",
  Unsigned8 = "Unsigned8",
  Unsigned16 = "Unsigned16",
  Unsigned32 = "Unsigned32",
  Unsigned64 = "Unsigned64",
  Float32 = "Float32",
  Float64 = "Float64",
}

export interface AstExpressionLiteral extends Ast {
  kind: AstExpressionLiteralKind;
  data: string;

  resolvedType?: AstType;
}
