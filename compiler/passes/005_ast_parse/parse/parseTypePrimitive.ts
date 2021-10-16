import {
  AstTypePrimitive,
  AstTypePrimitiveNative,
} from "../../../data/ast/AstTypePrimitive.ts";
import { Browser } from "../util/Browser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

const strToNative = new Map<string, AstTypePrimitiveNative>();
strToNative.set("any", AstTypePrimitiveNative.Any);
strToNative.set("str", AstTypePrimitiveNative.String);
strToNative.set("bool", AstTypePrimitiveNative.Boolean);
strToNative.set("null", AstTypePrimitiveNative.Null);
strToNative.set("i8", AstTypePrimitiveNative.Integer8);
strToNative.set("i16", AstTypePrimitiveNative.Integer16);
strToNative.set("i32", AstTypePrimitiveNative.Integer32);
strToNative.set("i64", AstTypePrimitiveNative.Integer64);
strToNative.set("u8", AstTypePrimitiveNative.Unsigned8);
strToNative.set("u16", AstTypePrimitiveNative.Unsigned16);
strToNative.set("u32", AstTypePrimitiveNative.Unsigned32);
strToNative.set("u64", AstTypePrimitiveNative.Unsigned64);
strToNative.set("f32", AstTypePrimitiveNative.Float32);
strToNative.set("f64", AstTypePrimitiveNative.Float64);

const templateOpen = new Set(["<"]);
const templateClose = new Set([">"]);
const templateDelim = new Set([","]);

export function parseTypePrimitive(
  browser: Browser,
): AstTypePrimitive | TokenImpasse {
  // read native
  const name = browser.peek();
  const native = strToNative.get(name.str);
  if (native === undefined) {
    return browser.impasse("TypePrimitive.NativeName");
  }
  browser.consume();
  // param
  const params = browser.recurseArray(
    false,
    templateOpen,
    templateClose,
    templateDelim,
    parseType,
  );
  if (params instanceof TokenImpasse) {
    return browser.impasse("TypePrimitive.Template", [
      params,
    ]);
  }
  // done
  return {
    native: native,
    params: params,
  };
}
