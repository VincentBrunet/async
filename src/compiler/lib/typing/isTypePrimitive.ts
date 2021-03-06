import { AstType, astTypeAsTypePrimitive } from '../../data/ast/AstType.ts';
import { AstTypePrimitiveNative } from '../../data/ast/AstTypePrimitive.ts';

export function isTypePrimitive(
  type: AstType,
  native: AstTypePrimitiveNative,
) {
  const primitive = astTypeAsTypePrimitive(type);
  if (primitive) {
    if (primitive.native === native) {
      return true;
    }
  }
  return false;
}
