import { AstType, AstTypeKind } from "../../data/ast/AstType.ts";
import {
  AstTypePrimitive,
  AstTypePrimitiveNative,
} from "../../data/ast/AstTypePrimitive.ts";

export function isTypePrimitive(
  type: AstType,
  native: AstTypePrimitiveNative,
) {
  if (type === undefined) {
    return false;
  }
  if (type.kind === AstTypeKind.Primitive) {
    if (native) {
      const data = type.data as AstTypePrimitive;
      if (data.native === native) {
        return true;
      }
    } else {
      return true;
    }
  }
  return false;
}
