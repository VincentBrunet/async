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
    return browser.impasse('AnnotationTemplate.Param.Name', []);
  }
  browser.consume();
  // template - annotation
  const astAnnotation = browser.recurse(parseAnnotationType);
  if (astAnnotation instanceof TokenImpasse) {
    return browser.impasse('AnnoationTemplate.Param.Annotation');
  }
  // ast
  return {
    name: templateName.str,
    annotation: astAnnotation,
  };
}

export function parseAnnotationTemplate(
  browser: Browser,
): AstAnnotationTemplate | TokenImpasse {
  // items
  const astTemplates = browser.recurseArray(
    false,
    templateOpen,
    templateClose,
    templateDelim,
    parseAnnotationTemplateParam,
  );
  if (astTemplates instanceof TokenImpasse) {
    return browser.impasse('AnnotationTemplate', [astTemplates]);
  }
  // done
  return {
    params: astTemplates,
  };
}
