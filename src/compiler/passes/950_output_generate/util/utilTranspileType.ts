import {
  AstType,
  astTypeAsBinary,
  astTypeAsFunction,
  astTypeAsIdentifier,
  astTypeAsObject,
  astTypeAsPrimitive,
} from '../../../data/ast/AstType.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { never } from '../../../passes/errors/never.ts';

const nativeToTranspiled = new Map<AstTypePrimitiveNative, string>();
nativeToTranspiled.set(AstTypePrimitiveNative.Boolean, 't_bool');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer8, 't_i8');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer16, 't_i16');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer32, 't_i32');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer64, 't_i64');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned8, 't_u8');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned16, 't_u16');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned32, 't_u32');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned64, 't_u64');
nativeToTranspiled.set(AstTypePrimitiveNative.Float32, 't_i32');
nativeToTranspiled.set(AstTypePrimitiveNative.Float64, 't_i64');
nativeToTranspiled.set(AstTypePrimitiveNative.Pointer, 't_ptr');
nativeToTranspiled.set(AstTypePrimitiveNative.Null, 't_null');
nativeToTranspiled.set(AstTypePrimitiveNative.String, 't_string');
nativeToTranspiled.set(AstTypePrimitiveNative.Any, 't_any');

export function utilTranspileType(type: AstType, dynamic?: boolean): string {
  const transpiledType = utilTranspileTypeBase(type);
  if (dynamic) {
    return transpiledType + '*';
  }
  return transpiledType;
}

export function utilTranspileTypeBase(type: AstType): string {
  const typePrimitive = astTypeAsPrimitive(type);
  if (typePrimitive) {
    return nativeToTranspiled.get(typePrimitive.native) ?? 't_unknown';
  }

  const typeFunction = astTypeAsFunction(type);
  if (typeFunction) {
    return 't_function';
  }

  const typeObject = astTypeAsObject(type);
  if (typeObject) {
    return 't_object';
  }

  const typeBinary = astTypeAsBinary(type);
  if (typeBinary) {
    return 't_union';
  }

  const typeIdentifier = astTypeAsIdentifier(type);
  if (typeIdentifier) {
    //return utilTranspileTypeBase(typeIdentifier.resolvedReferenceType?.data.resolvedType);
    never();
    /*
    const typedef =  = ensure(typeIdentifier.resolvedReferenceType);
    assert(dataReference.kind === AstReferenceKind.StatementTypedef);
    const dataTypedef = (dataReference.data as AstStatementTypedef).type;
    return utilTranspileTypeBase(dataTypedef);
    */
  }

  never();
}
