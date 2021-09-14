import { AstType } from "./AstType.ts";

export enum AstTypeBinaryOperator {
  Or = "Or",
  And = "And",
}

export interface AstTypeBinary {
  operator: AstTypeBinaryOperator;
  type1: AstType;
  type2: AstType;
}
