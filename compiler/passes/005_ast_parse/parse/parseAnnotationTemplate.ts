import {
  AstAnnotationTemplate,
  AstAnnotationTemplateParam,
} from "../../../data/ast/AstAnnotationTemplate.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseAnnotationType } from "./parseAnnotationType.ts";

export function parseAnnotationTemplate(
  browser: TokenBrowser,
): AstAnnotationTemplate | TokenImpasse {
  // template
  const astTemplates = new Array<AstAnnotationTemplateParam>();

  // template - open
  const templateOpen = browser.peek();
  if (templateOpen.str === "<") {
    browser.consume();

    // template - loop
    while (true) {
      // template - close
      const templateClose = browser.peek();
      if (templateClose.str === ">") {
        browser.consume();
        break;
      }

      // template - name
      const templateName = browser.peek();
      if (templateName.kind !== TokenKind.Text) {
        return browser.impasse("AnnotationTemplate.Name", []);
      }
      browser.consume();

      // template - annotation
      const astAnnotation = browser.recurse(parseAnnotationType);
      if (astAnnotation instanceof TokenImpasse) {
        return browser.impasse("AnnoationTemplate.Annotation");
      }

      // template - validated
      astTemplates.push({
        name: templateName.str,
        annotation: astAnnotation,
      });

      // template - separator, end
      const templateDelim = browser.peek();
      if (templateDelim.str === ",") {
        browser.consume();
      } else if (templateDelim.str === ">") {
        browser.consume();
        break;
      } else {
        return browser.impasse("AnnotationTemplate.Separator");
      }
    }
  }

  // done
  return {
    params: astTemplates,
  };
}
