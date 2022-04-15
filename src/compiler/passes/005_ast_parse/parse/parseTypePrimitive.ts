import { AstTypePrimitive, AstTypePrimitiveNative } from '../../../data/ast/AstTypePrimitive.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';

const strToNative = new Map<string, AstTypePrimitiveNative>();
strToNative.set('unknown', AstTypePrimitiveNative.Unknown);
strToNative.set('nothing', AstTypePrimitiveNative.Nothing);
strToNative.set('never', AstTypePrimitiveNative.Never);
strToNative.set('str', AstTypePrimitiveNative.String);
strToNative.set('bool', AstTypePrimitiveNative.Boolean);
strToNative.set('i8', AstTypePrimitiveNative.Integer8);
strToNative.set('i16', AstTypePrimitiveNative.Integer16);
strToNative.set('i32', AstTypePrimitiveNative.Integer32);
strToNative.set('i64', AstTypePrimitiveNative.Integer64);
strToNative.set('u8', AstTypePrimitiveNative.Unsigned8);
strToNative.set('u16', AstTypePrimitiveNative.Unsigned16);
strToNative.set('u32', AstTypePrimitiveNative.Unsigned32);
strToNative.set('u64', AstTypePrimitiveNative.Unsigned64);
strToNative.set('f32', AstTypePrimitiveNative.Float32);
strToNative.set('f64', AstTypePrimitiveNative.Float64);
strToNative.set('ptr', AstTypePrimitiveNative.Pointer);

const nativeSet = new Set(strToNative.keys());

export function parseTypePrimitive(
  browser: Browser,
): AstTypePrimitive | TokenImpasse {
  // read native
  const name = browser.peek();
  const native = strToNative.get(name.str);
  if (native === undefined) {
    return browser.impasseLeaf('Native', nativeSet);
  }
  browser.consume();
  // done
  return {
    native: native,
  };
}
