import { AstType } from "../../../data/ast/AstType.ts";
import {
  AstTypePrimitive,
  AstTypePrimitiveNative,
} from "../../../data/ast/AstTypePrimitive.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
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

export function parseTypePrimitive(
  browser: TokenBrowser,
): AstTypePrimitive | TokenImpasse {
  // read native
  const name = browser.peek();
  const native = strToNative.get(name.str);
  if (native === undefined) {
    return browser.impasse("TypePrimitive");
  }
  browser.consume();

  // param
  const astParams = new Array<AstType>();

  // param - open
  const paramOpen = browser.peek();
  if (paramOpen.str === "<") {
    browser.consume();

    // param - loop
    while (true) {
      // param - close
      const paramClose = browser.peek();
      if (paramClose.str === ">") {
        browser.consume();
        break;
      }

      // param - type annotation
      const paramType = browser.recurse(parseType);
      if (paramType instanceof TokenImpasse) {
        return browser.impasse("TypePrimitive.Template.Type", [
          paramType,
        ]);
      }

      // param - validated
      astParams.push(paramType);

      // param - separator, end
      const paramDelim = browser.peek();
      if (paramDelim.str === ",") {
        browser.consume();
      } else if (paramDelim.str === ">") {
        browser.consume();
        break;
      } else {
        return browser.impasse("TypePrimitive.Template.Separator");
      }
    }
  }

  // done
  return {
    native: native,
    params: astParams,
  };
}
