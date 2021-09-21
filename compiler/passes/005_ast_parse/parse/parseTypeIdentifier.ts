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

  // param
  const astParams = new Array<AstType>();

  // param - open
  const paramOpen = browser.peek();
  if (paramOpen.str === "<") {
    browser.consume();

    // param - loop
    while (true) {
      // param - close
      const paramClose = browser.peek();
      if (paramClose.str === ">") {
        browser.consume();
        break;
      }

      // param - type annotation
      const paramType = browser.recurse(parseType);
      if (paramType instanceof TokenImpasse) {
        return browser.impasse("TypeIdentifier.Template.Type", [
          paramType,
        ]);
      }

      // param - validated
      astParams.push(paramType);

      // param - separator, end
      const paramDelim = browser.peek();
      if (paramDelim.str === ",") {
        browser.consume();
      } else if (paramDelim.str === ">") {
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
    params: astParams,
  };
}
