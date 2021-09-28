import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import {
  AstTypePrimitive,
  AstTypePrimitiveId,
} from "../../data/ast/AstTypePrimitive.ts";

export function isTypePrimitive(
  type?: AstType,
  id?: AstTypePrimitiveId,
) {
  if (type === undefined) {
    return false;
  }
  if (type.kind === AstTypeKind.Primitive) {
    if (id) {
      const data = type.data as AstTypePrimitive;
      if (data.id === id) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
}
