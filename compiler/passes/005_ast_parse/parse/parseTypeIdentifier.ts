import { AstType } from "../../../data/ast/AstType.ts";
import { AstTypeIdentifier } from "../../../data/ast/AstTypeIdentifier.ts";
import { TokenKind } from "../../../data/token/Token.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseType } from "./parseType.ts";

export function parseTypeIdentifier(
  browser: TokenBrowser,
): AstTypeIdentifier | TokenImpasse {
  // read identifier
  const name = browser.peek();
  if (name.kind !== TokenKind.Text) {
    return browser.impasse("TypeIdentifier");
  }
  browser.consume();

  // template
  const astTemplates = new Array<AstType>();

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

      // template - type annotation
      const templateType = browser.recurse(parseType);
      if (templateType instanceof TokenImpasse) {
        return browser.impasse("TypeIdentifier.Template.Type", [
          templateType,
        ]);
      }

      // template - validated
      astTemplates.push(templateType);

      // template - separator, end
      const templateDelim = browser.peek();
      if (templateDelim.str === ",") {
        browser.consume();
      } else if (templateDelim.str === ">") {
        browser.consume();
        break;
      } else {
        return browser.impasse("TypeIdentifier.Template.Separator");
      }
    }
  }

  // done
  return {
    name: name.str,
    templates: astTemplates,
  };
}
