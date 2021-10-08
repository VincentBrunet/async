import {
  AstExpressionFunction,
  AstExpressionFunctionParam,
} from "../../../data/ast/AstExpressionFunction.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationTemplate } from "./parseAnnotationTemplate.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";
import { parseBlock } from "./parseBlock.ts";

const paramOpen = new Set(["("]);
const paramClose = new Set([")"]);
const paramDelim = new Set([","]);

export function parseExpressionFunctionParam(
  browser: TokenBrowser,
): AstExpressionFunctionParam | TokenImpasse {
  // param - optional name
  let name: string | undefined;
  const paramName = browser.peek();
  if (paramName.kind === TokenKind.Text) {
    browser.consume();
    name = paramName.str;
  }
  // param - type annotation
  const paramAnnotation = browser.recurse(parseAnnotationType);
  if (paramAnnotation instanceof TokenImpasse) {
    return browser.impasse("Function.Param.Annotation", [paramAnnotation]);
  }
  // param - validated
  return {
    name: name,
    annotation: paramAnnotation,
  };
}

export function parseExpressionFunction(
  browser: TokenBrowser,
): AstExpressionFunction | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== "fn") {
    return browser.impasse("ExpressionFunction.Keyword");
  }
  browser.consume();
  // template annotation
  const astTemplate = browser.recurse(parseAnnotationTemplate);
  if (astTemplate instanceof TokenImpasse) {
    return browser.impasse("ExpressionFunction.Templates", [astTemplate]);
  }
  // param
  const astParams = browser.recurseArray(
    false,
    paramOpen,
    paramClose,
    paramDelim,
    parseExpressionFunctionParam,
  );
  if (astParams instanceof TokenImpasse) {
    return browser.impasse("ExpressionFunction.Params", [astParams]);
  }
  // return type annotation
  const astReturn = browser.recurse(parseAnnotationType);
  if (astReturn instanceof TokenImpasse) {
    return browser.impasse("ExpressionFunction.Return", [astReturn]);
  }
  // block (optional)
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("ExpressionFunction.Block", [astBlock]);
  }
  // done, create ast
  return {
    template: astTemplate,
    params: astParams,
    ret: astReturn,
    block: astBlock,
  };
}
