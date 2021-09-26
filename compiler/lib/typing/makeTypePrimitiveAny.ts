import { Ast } from "../../data/ast/Ast.ts";
import { AstTypePrimitiveId } from "../../data/ast/AstTypePrimitive.ts";
import { makeTypePrimitive } from "./makeTypePrimitive.ts";

export function makeTypePrimitiveAny(
  source?: Ast,
) {
  return makeTypePrimitive(AstTypePrimitiveId.Any, [], source);
}
