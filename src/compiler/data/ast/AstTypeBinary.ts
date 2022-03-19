import { Ast } from "./Ast.ts";
import { AstType } from "./AstType.ts";

export enum AstTypeBinaryOperator {
  And = "And",
  Or = "Or",
}

export interface AstTypeBinary extends Ast {
  operator: AstTypeBinaryOperator;
  type1: AstType;
  type2: AstType;
}
