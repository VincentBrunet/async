import {
  AstType,
  AstTypeData,
  AstTypeKind,
} from "../../../data/ast/AstType.ts";
import { TokenBrowser } from "../util/TokenBrowser.ts";
import { TokenImpasse } from "../util/TokenImpasse.ts";
import { parseTypeBinary } from "./parseTypeBinary.ts";
import { parseTypeFunction } from "./parseTypeFunction.ts";
import { parseTypeIdentifier } from "./parseTypeIdentifier.ts";
import { parseTypeObject } from "./parseTypeObject.ts";

function makeType(kind: AstTypeKind, data: AstTypeData) {
  return { kind: kind, data: data };
}

const leafs = new Array<
  [AstTypeKind, (b: TokenBrowser) => AstTypeData | TokenImpasse]
>();
leafs.push([AstTypeKind.Identifier, parseTypeIdentifier]);
leafs.push([AstTypeKind.Function, parseTypeFunction]);
leafs.push([AstTypeKind.Object, parseTypeObject]);

const recursors = new Array<
  [
    AstTypeKind,
    (b: TokenBrowser, left: AstType) => AstTypeData | TokenImpasse,
  ]
>();
recursors.push([AstTypeKind.Binary, parseTypeBinary]);

export function parseType(
  browser: TokenBrowser,
  leafOnly?: boolean,
): AstType | TokenImpasse {
  // Start with a simple leaf Type
  const astImpasses = new Array<TokenImpasse>();
  let astLeft: AstType | undefined;
  for (const leaf of leafs) {
    const astResult = browser.recurse(leaf[1]);
    if (astResult instanceof TokenImpasse) {
      astImpasses.push(astResult);
    } else {
      astLeft = makeType(leaf[0], astResult);
      break;
    }
  }
  if (astLeft === undefined) {
    return browser.impasse("Type", astImpasses);
  }

  // Then do a right recursion
  let astCurrent = astLeft;
  let keepRecursing = !leafOnly;
  while (keepRecursing) {
    keepRecursing = false;
    for (const recursor of recursors) {
      const astResult = browser.recurse<
        AstTypeData,
        AstType | undefined
      >(
        recursor[1] as any, // wut type-mess
        astCurrent,
      );
      if (astResult instanceof TokenImpasse) {
        // no-op
      } else {
        keepRecursing = true;
        astCurrent = makeType(recursor[0], astResult);
      }
    }
  }

  // Keep the latest proper Type
  return astCurrent;
}
