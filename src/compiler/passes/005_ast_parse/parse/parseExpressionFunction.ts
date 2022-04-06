import { AstExpressionFunction, AstExpressionFunctionParam, AstExpressionFunctionReturn } from '../../../data/ast/AstExpressionFunction.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationTemplate } from './parseAnnotationTemplate.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';
import { parseBlock } from './parseBlock.ts';

const paramOpen = new Set(['(']);
const paramClose = new Set([')']);
const paramDelim = new Set([',']);

export function parseExpressionFunctionParam(
  browser: Browser,
): AstExpressionFunctionParam | TokenImpasse {
  // param - optional name
  let name: string | undefined;
  const paramName = browser.peek();
  if (tokenIsText(paramName)) {
    browser.consume();
    name = paramName.str;
  }
  // param - type annotation
  const paramAnnotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (paramAnnotation instanceof TokenImpasse) {
    return browser.impasseNode(paramAnnotation);
  }
  // param - validated
  return {
    name: name,
    annotation: paramAnnotation,
  };
}

export function parseExpressionFunctionReturn(
  browser: Browser,
): AstExpressionFunctionReturn | TokenImpasse {
  const returnAnnotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (returnAnnotation instanceof TokenImpasse) {
    return browser.impasseNode(returnAnnotation);
  }
  return {
    annotation: returnAnnotation,
  };
}

export function parseExpressionFunction(
  browser: Browser,
): AstExpressionFunction | TokenImpasse {
  // keyword (required)
  const keyword = browser.peek();
  if (keyword.str !== 'fn') {
    return browser.impasseLeaf('Keyword', 'fn');
  }
  browser.consume();
  // template annotation
  const astTemplate = browser.recurse('AnnotationTemplate', parseAnnotationTemplate);
  if (astTemplate instanceof TokenImpasse) {
    return browser.impasseNode(astTemplate);
  }
  // param
  const astParams = browser.recurseArray(
    'Param',
    false,
    paramOpen,
    paramClose,
    paramDelim,
    parseExpressionFunctionParam,
  );
  if (astParams instanceof TokenImpasse) {
    return browser.impasseNode(astParams);
  }
  // return type
  const astReturn = browser.recurse('Return', parseExpressionFunctionReturn);
  if (astReturn instanceof TokenImpasse) {
    return browser.impasseNode(astReturn);
  }
  // block (optional)
  const astBlock = browser.recurse('Block', parseBlock);
  if (astBlock instanceof TokenImpasse) {
    return browser.impasseNode(astBlock);
  }
  // done, create ast
  return {
    template: astTemplate,
    params: astParams,
    ret: astReturn,
    block: astBlock,
  };
}
