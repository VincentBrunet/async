export enum AstLiteralType {
  String, // TODO
  Boolean,
  Null,
  Integer8,
  Integer16,
  Integer32,
  Integer64,
  Unsigned8,
  Unsigned16,
  Unsigned32,
  Unsigned64,
  Float32,
  Float64,
}

export interface AstLiteral {
  type: AstLiteralType;
  value: string;
}
