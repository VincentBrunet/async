import {
  AstTypeFunction,
  AstTypeFunctionParam,
} from "../../../data/ast/AstTypeFunction.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";

const paramOpen = new Set(["("]);
const paramClose = new Set([")"]);
const paramDelim = new Set([","]);

function parseTypeFunctionParam(
  browser: TokenBrowser,
): AstTypeFunctionParam | TokenImpasse {
  // name
  let name: string | undefined;
  const paramName = browser.peek();
  if (paramName.kind === TokenKind.Text) {
    browser.consume();
    name = paramName.str;
  }
  // type
  const paramAnnotation = browser.recurse(parseAnnotationType);
  if (paramAnnotation instanceof TokenImpasse) {
    return browser.impasse("TypeFunction.Param.Annotation", [
      paramAnnotation,
    ]);
  }
  if (paramAnnotation.type === undefined) {
    return browser.impasse("TypeFunction.Param.Type");
  }
  // done
  return {
    name: name ?? "",
    type: paramAnnotation.type,
  };
}

export function parseTypeFunction(
  browser: TokenBrowser,
): AstTypeFunction | TokenImpasse {
  // params
  const params = browser.recurseArray(
    true,
    paramOpen,
    paramClose,
    paramDelim,
    parseTypeFunctionParam,
  );
  if (params instanceof TokenImpasse) {
    return browser.impasse("TypeFunction.Params", [
      params,
    ]);
  }
  // return
  const returnAnnotation = browser.recurse(parseAnnotationType);
  if (returnAnnotation instanceof TokenImpasse) {
    return browser.impasse("TypeFunction.Return.Annotation", [
      returnAnnotation,
    ]);
  }
  if (returnAnnotation.type === undefined) {
    return browser.impasse("TypeFunction.Return.Type");
  }
  // done, ast
  return {
    params: params,
    ret: returnAnnotation.type,
  };
}
