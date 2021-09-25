import { AstType } from "../../../data/ast/AstType.ts";
import {
  AstTypePrimitive,
  AstTypePrimitiveId,
} from "../../../data/ast/AstTypePrimitive.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

const strToId = new Map<string, AstTypePrimitiveId>();
strToId.set("any", AstTypePrimitiveId.Any);
strToId.set("str", AstTypePrimitiveId.String);
strToId.set("bool", AstTypePrimitiveId.Boolean);
strToId.set("null", AstTypePrimitiveId.Null);
strToId.set("i8", AstTypePrimitiveId.Integer8);
strToId.set("i16", AstTypePrimitiveId.Integer16);
strToId.set("i32", AstTypePrimitiveId.Integer32);
strToId.set("i64", AstTypePrimitiveId.Integer64);
strToId.set("u8", AstTypePrimitiveId.Unsigned8);
strToId.set("u16", AstTypePrimitiveId.Unsigned16);
strToId.set("u32", AstTypePrimitiveId.Unsigned32);
strToId.set("u64", AstTypePrimitiveId.Unsigned64);
strToId.set("f32", AstTypePrimitiveId.Float32);
strToId.set("f64", AstTypePrimitiveId.Float64);

export function parseTypePrimitive(
  browser: TokenBrowser,
): AstTypePrimitive | TokenImpasse {
  // read id
  const name = browser.peek();
  const id = strToId.get(name.str);
  if (id === undefined) {
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
    id: id,
    params: astParams,
  };
}
