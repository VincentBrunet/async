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

export function parseExpressionFunction(
  browser: TokenBrowser,
): AstExpressionFunction | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== "fn") {
    return browser.impasse("Function.Keyword");
  }
  browser.consume();

  // template annotation
  const astTemplate = browser.recurse(parseAnnotationTemplate);
  if (astTemplate instanceof TokenImpasse) {
    return browser.impasse("Function.Templates", [astTemplate]);
  }

  // params
  const astParams = new Array<AstExpressionFunctionParam>();

  // params - open
  const paramOpen = browser.peek();
  if (paramOpen.str === "(") {
    browser.consume();
    // params - loop
    while (true) {
      // params - close
      const paramClose = browser.peek();
      if (paramClose.str === ")") {
        browser.consume();
        break;
      }

      // params - optional name
      let name: string | undefined;
      const paramName = browser.peek();
      if (paramName.kind === TokenKind.Text) {
        browser.consume();
        name = paramName.str;
      }
      // params - type annotation
      const paramAnnotation = browser.recurse(parseAnnotationType);
      if (paramAnnotation instanceof TokenImpasse) {
        return browser.impasse("Function.Param.Annotation", [paramAnnotation]);
      }
      // param - validated
      astParams.push({
        name: name ?? ("p" + astParams.length),
        annotation: paramAnnotation,
      });

      // params - separator, end
      const paramDelim = browser.peek();
      if (paramDelim.str === ",") {
        browser.consume();
      } else if (paramDelim.str === ")") {
        browser.consume();
        break;
      } else {
        return browser.impasse("Function.Param.Separator");
      }
    }
  }

  // return type annotation
  const astReturn = browser.recurse(parseAnnotationType);
  if (astReturn instanceof TokenImpasse) {
    return browser.impasse("Function.Return", [astReturn]);
  }

  // block (optional)
  const astBlock = browser.recurse(parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasse("Function.Block", [astBlock]);
  }

  // done, create ast
  return {
    template: astTemplate,
    params: astParams,
    return: astReturn,
    block: astBlock,
  };
}
