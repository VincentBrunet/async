import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import {
  AstTypePrimitive,
  AstTypePrimitiveId,
} from "../../data/ast/AstTypePrimitive.ts";

export function isTypePrimitive(
  type: AstType | undefined,
  id: AstTypePrimitiveId,
) {
  if (type === undefined) {
    return false;
  }
  if (type.kind === AstTypeKind.Primitive) {
    const data = type.data as AstTypePrimitive;
    if (data.id === id) {
      return true;
    }
  }
  return false;
}
