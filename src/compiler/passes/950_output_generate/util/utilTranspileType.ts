import { AstResolvedReferenceData, AstResolvedReferenceKind } from '../../../data/ast/AstResolvedReference.ts';
import { AstStatementTypedef } from '../../../data/ast/AstStatementTypedef.ts';
import { AstType, AstTypeKind } from '../../../data/ast/AstType.ts';
import { AstTypeFunction } from '../../../data/ast/AstTypeFunction.ts';
import { AstTypeIdentifier } from '../../../data/ast/AstTypeIdentifier.ts';
import { AstTypeObject } from '../../../data/ast/AstTypeObject.ts';
import { AstTypeParenthesis } from '../../../data/ast/AstTypeParenthesis.ts';
import { AstTypePrimitive, AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { assert } from '../../../lib/errors/assert.ts';
import { ensure } from '../../../lib/errors/ensure.ts';
import { never } from '../../../lib/errors/never.ts';

function getPrimitiveNative(type: AstType): AstTypePrimitiveNative | undefined {
  if (type.kind === AstTypeKind.Primitive) {
    const primitive = type.data as AstTypePrimitive;
    return primitive.native;
  }
  return undefined;
}

const nativeToTranspiled = new Map<AstTypePrimitiveNative, string>();
nativeToTranspiled.set(AstTypePrimitiveNative.Boolean, 't_bool');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer8, 't_i8');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer16, 't_i16');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer32, 't_i32');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer64, 't_i64');
nativeToTranspiled.set(AstTypePrimitiveNative.Float32, 't_i32');
nativeToTranspiled.set(AstTypePrimitiveNative.Float64, 't_i64');
nativeToTranspiled.set(AstTypePrimitiveNative.Null, 't_null');
nativeToTranspiled.set(AstTypePrimitiveNative.String, 't_string');
nativeToTranspiled.set(AstTypePrimitiveNative.Any, 't_any');

export function utilTranspileType(type: AstType): string {
  if (type.kind === AstTypeKind.Parenthesis) {
    const dataParenthesis = (type.data as AstTypeParenthesis);
    return utilTranspileType(dataParenthesis.type);
  }

  const native = getPrimitiveNative(type);
  if (native) {
    return nativeToTranspiled.get(native) ?? 't_unknown';
  }

  if (type.kind === AstTypeKind.Function) {
    const dataFunction = type.data as AstTypeFunction;
    return 't_function *';
  }

  if (type.kind === AstTypeKind.Object) {
    const dataObject = type.data as AstTypeObject;
    return 't_object *';
  }

  if (type.kind === AstTypeKind.Identifier) {
    const dataIdentifier = (type.data as AstTypeIdentifier);
    const dataReference = ensure(dataIdentifier.resolvedReference);
    assert(dataReference.kind === AstResolvedReferenceKind.StatementTypedef);
    const dataTypedef = (dataReference.data as AstStatementTypedef).type;
    return utilTranspileType(dataTypedef);
  }

  if (type.kind === AstTypeKind.Binary) {
    never();
  }

  never();
}
