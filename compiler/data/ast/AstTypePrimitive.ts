import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export enum AstTypePrimitiveNative {
  Any = "any",
  String = "str",
  Boolean = "bool",
  Null = "null",
  Integer8 = "i8",
  Integer16 = "i16",
  Integer32 = "i32",
  Integer64 = "i64",
  Unsigned8 = "u8",
  Unsigned16 = "u16",
  Unsigned32 = "u32",
  Unsigned64 = "u64",
  Float32 = "f32",
  Float64 = "f64",
  Unknown = "unknown",
}

export interface AstTypePrimitive extends Ast {
  native: AstTypePrimitiveNative;
  params: Array<AstType>;
}
