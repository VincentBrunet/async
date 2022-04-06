import { AstTypeFunction, AstTypeFunctionParam, AstTypeFunctionReturn } from '../../../data/ast/AstTypeFunction.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';

const paramOpen = new Set(['(']);
const paramClose = new Set([')']);
const paramDelim = new Set([',']);

function parseTypeFunctionParam(
  browser: Browser,
): AstTypeFunctionParam | TokenImpasse {
  // name
  let name: string | undefined;
  const paramName = browser.peek();
  if (tokenIsText(paramName)) {
    browser.consume();
    name = paramName.str;
  }
  // type
  const paramAnnotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (paramAnnotation instanceof TokenImpasse) {
    return browser.impasseNode(paramAnnotation);
  }
  // done
  return {
    name: name ?? '',
    annotation: paramAnnotation,
  };
}

function parseTypeFunctionReturn(
  browser: Browser,
): AstTypeFunctionReturn | TokenImpasse {
  const astTypeAnnotation = browser.recurse('AnnotationType', parseAnnotationType);
  if (astTypeAnnotation instanceof TokenImpasse) {
    return browser.impasseNode(astTypeAnnotation);
  }
  return {
    annotation: astTypeAnnotation,
  };
}

export function parseTypeFunction(
  browser: Browser,
): AstTypeFunction | TokenImpasse {
  // params
  const params = browser.recurseArray(
    'Param',
    true,
    paramOpen,
    paramClose,
    paramDelim,
    parseTypeFunctionParam,
  );
  if (params instanceof TokenImpasse) {
    return browser.impasseNode(params);
  }
  // return
  const astRet = browser.recurse('Return', parseTypeFunctionReturn);
  if (astRet instanceof TokenImpasse) {
    return browser.impasseNode(astRet);
  }
  // done, ast
  return {
    params: params,
    ret: astRet,
  };
}
