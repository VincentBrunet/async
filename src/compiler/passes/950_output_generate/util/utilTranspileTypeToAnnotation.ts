import {
  AstType,
  astTypeAsTypeBinary,
  astTypeAsTypeFunction,
  astTypeAsTypeIdentifier,
  astTypeAsTypeObject,
  astTypeAsTypePrimitive,
} from '../../../data/ast/AstType.ts';
import { AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { never } from '../../../passes/errors/never.ts';

const nativeToTranspiled = new Map<AstTypePrimitiveNative, string>();
nativeToTranspiled.set(AstTypePrimitiveNative.Unknown, 'ac::unknown');
nativeToTranspiled.set(AstTypePrimitiveNative.Boolean, 'ac::boolean');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer8, 'ac::i8');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer16, 'ac::i16');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer32, 'ac::i32');
nativeToTranspiled.set(AstTypePrimitiveNative.Integer64, 'ac::i64');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned8, 'ac::u8');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned16, 'ac::u16');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned32, 'ac::u32');
nativeToTranspiled.set(AstTypePrimitiveNative.Unsigned64, 'ac::u64');
nativeToTranspiled.set(AstTypePrimitiveNative.Float32, 'ac::i32');
nativeToTranspiled.set(AstTypePrimitiveNative.Float64, 'ac::i64');
nativeToTranspiled.set(AstTypePrimitiveNative.Pointer, 'ac::pointer');
nativeToTranspiled.set(AstTypePrimitiveNative.Null, 'ac::null');
nativeToTranspiled.set(AstTypePrimitiveNative.String, 'ac::string');
nativeToTranspiled.set(AstTypePrimitiveNative.Void, 'ac::void');
nativeToTranspiled.set(AstTypePrimitiveNative.Never, 'ac::never');

export function utilTranspileTypeToAnnotation(type: AstType, heapized: boolean | undefined): string {
  const transpiledType = utilTranspileTypeToAnnotationBase(type) ?? 'ac::unknown';
  if (heapized) {
    return 'ac::ref<' + transpiledType + '>';
  }
  return transpiledType;
}

function utilTranspileTypeToAnnotationBase(type?: AstType): string | undefined {
  if (type === undefined) {
    return undefined;
  }

  const typePrimitive = astTypeAsTypePrimitive(type);
  if (typePrimitive) {
    return nativeToTranspiled.get(typePrimitive.native);
  }

  const typeFunction = astTypeAsTypeFunction(type);
  if (typeFunction) {
    const length = typeFunction.params.length.toString();
    const ret = utilTranspileTypeToAnnotationBase(typeFunction.ret.annotation.type);
    const params = typeFunction.params.map((param) => {
      return utilTranspileTypeToAnnotationBase(param.annotation.type);
    });
    return ' ac::function' + length + '<' + ret + ', ' + params.join(', ') + '> ';
  }

  const typeObject = astTypeAsTypeObject(type);
  if (typeObject) {
    return 'ac::object';
  }

  const typeBinary = astTypeAsTypeBinary(type);
  if (typeBinary) {
    return 'ac::union';
  }

  const typeIdentifier = astTypeAsTypeIdentifier(type);
  if (typeIdentifier) {
    //return utilTranspileTypeToAnnotation(typeIdentifier.resolvedReferenceType?.data.resolvedType);
    never();
    /*
    const typedef =  = ensure(typeIdentifier.resolvedReferenceType);
    assert(dataReference.kind === AstReferenceKind.StatementTypedef);
    const dataTypedef = (dataReference.data as AstStatementTypedef).type;
    return utilTranspileTypeToAnnotation(dataTypedef);
    */
  }

  never();
}
