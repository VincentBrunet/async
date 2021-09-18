import {
  AstTypeFunction,
  AstTypeFunctionParam,
} from "../../../data/ast/AstTypeFunction.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotation } from "./parseAnnotation.ts";

export function parseTypeFunction(
  browser: TokenBrowser,
): AstTypeFunction | TokenImpasse {
  // param - open
  const paramOpen = browser.peek();
  if (paramOpen.str !== "(") {
    return browser.impasse("TypeFunction.Param.Open");
  }
  browser.consume();

  // param - loop
  const astParams = new Array<AstTypeFunctionParam>();
  while (true) {
    // param - close
    const paramClose = browser.peek();
    if (paramClose.str === ")") {
      browser.consume();
      break;
    }

    // param - name
    let name: string | undefined;
    const paramName = browser.peek();
    if (paramName.kind === TokenKind.Text) {
      browser.consume();
      name = paramName.str;
    }
    // param - type
    const paramAnnotation = browser.recurse(parseAnnotation);
    if (paramAnnotation instanceof TokenImpasse) {
      return browser.impasse("TypeFunction.Param.Annotation", [
        paramAnnotation,
      ]);
    }
    if (paramAnnotation.type === undefined) {
      return browser.impasse("TypeFunction.Param.Type");
    }
    // param - validated
    astParams.push({
      name: name ?? ("p" + astParams.length),
      type: paramAnnotation.type,
    });

    // params - separator, end
    const paramDelim = browser.peek();
    if (paramDelim.str === ",") {
      browser.consume();
    } else if (paramDelim.str === ")") {
      browser.consume();
      break;
    } else {
      return browser.impasse("TypeFunction.Param.Separator");
    }
  }

  // return
  const returnAnnotation = browser.recurse(parseAnnotation);
  if (returnAnnotation instanceof TokenImpasse) {
    return browser.impasse("TypeFunction.Param.Annotation", [
      returnAnnotation,
    ]);
  }
  if (returnAnnotation.type === undefined) {
    return browser.impasse("TypeFunction.Param.Type");
  }

  // done, ast
  return {
    params: astParams,
    return: returnAnnotation.type,
  };
}
