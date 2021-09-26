import { Ast } from "../../data/ast/Ast.ts";
import { AstTypePrimitiveId } from "../../data/ast/AstTypePrimitive.ts";
import { makeTypePrimitive } from "./makeTypePrimitive.ts";

export function makeTypePrimitiveUnknown(
  source?: Ast,
) {
  return makeTypePrimitive(AstTypePrimitiveId.Unknown, [], source);
}
