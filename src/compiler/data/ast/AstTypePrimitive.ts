import { Ast } from './Ast.ts';

export enum AstTypePrimitiveNative {
  Unknown = 'unknown',
  Nothing = 'nothing',
  Never = 'never',
  String = 'str',
  Boolean = 'bool',
  Integer8 = 'i8',
  Integer16 = 'i16',
  Integer32 = 'i32',
  Integer64 = 'i64',
  Unsigned8 = 'u8',
  Unsigned16 = 'u16',
  Unsigned32 = 'u32',
  Unsigned64 = 'u64',
  Float32 = 'f32',
  Float64 = 'f64',
  Pointer = 'ptr',
}

export interface AstTypePrimitive extends Ast {
  native: AstTypePrimitiveNative;
}
