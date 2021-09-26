import { Ast } from "../../data/ast/Ast.ts";
import { AstTypePrimitiveId } from "../../data/ast/AstTypePrimitive.ts";
import { makeTypePrimitive } from "./makeTypePrimitive.ts";

export function makeTypePrimitiveBoolean(
  source?: Ast,
) {
  return makeTypePrimitive(AstTypePrimitiveId.Boolean, [], source);
}
