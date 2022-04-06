import { AstAnnotationTemplate, AstAnnotationTemplateParam } from '../../../data/ast/AstAnnotationTemplate.ts';
import { tokenIsText } from '../../../data/token/Token.ts';
import { Browser } from '../util/Browser.ts';
import { TokenImpasse } from '../util/TokenImpasse.ts';
import { parseAnnotationType } from './parseAnnotationType.ts';

const templateOpen = new Set(['<']);
const templateClose = new Set(['>']);
const templateDelim = new Set([',']);

function parseAnnotationTemplateParam(
  browser: Browser,
): AstAnnotationTemplateParam | TokenImpasse {
  // template - name
  const templateName = browser.peek();
  if (!tokenIsText(templateName)) {
    return browser.impasseLeaf('Name', 'Type local name');
  }
  browser.consume();
  // template - annotation
  const astAnnotationType = browser.recurse('AnnotationType', parseAnnotationType);
  if (astAnnotationType instanceof TokenImpasse) {
    return browser.impasseNode(astAnnotationType);
  }
  // ast
  return {
    name: templateName.str,
    annotation: astAnnotationType,
  };
}

export function parseAnnotationTemplate(
  browser: Browser,
): AstAnnotationTemplate | TokenImpasse {
  // items
  const astAnnotationTemplateParams = browser.recurseArray(
    'Param',
    false,
    templateOpen,
    templateClose,
    templateDelim,
    parseAnnotationTemplateParam,
  );
  if (astAnnotationTemplateParams instanceof TokenImpasse) {
    return browser.impasseNode(astAnnotationTemplateParams);
  }
  // done
  return {
    params: astAnnotationTemplateParams,
  };
}
