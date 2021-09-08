import { Token } from "../../data/token/Token.ts";
import { TokenKind } from "../../data/token/TokenKind.ts";

const invalidArray = ["\v", "\b", "\f"];
const invalidSet = new Set(invalidArray);

const whitespaceArray = [" ", "\t", "\n", "\r", "\0"];
const whitespaceSet = new Set(whitespaceArray);

const specialPairsArray = ["<", ">", "{", "}", "(", ")", "[", "]", "'", '"'];
const specialMathsArray = ["-", "+", "%", "*", "|", "&", "=", "^"];
const specialPonctArray = [",", ";", ".", ":", "!", "?"];
const specialMiscArray = ["/", "\\", "@", "~", "#"];
const specialSet = new Set([
  ...specialPairsArray,
  ...specialMathsArray,
  ...specialPonctArray,
  ...specialMiscArray,
]);

interface PartialToken {
  kind: TokenKind;
  chars: Array<string>;
}

export function convertCodeToTokens(code: string): Array<Token> {
  const tokens = new Array<Token>();
  let currentToken: PartialToken | undefined = undefined;
  for (let idx = 0; idx < code.length; idx++) {
    const char = code.charAt(idx);
    let kind;
    if (invalidSet.has(char)) {
      kind = TokenKind.Invalid;
    } else if (whitespaceSet.has(char)) {
      kind = TokenKind.Whitespace;
    } else if (specialSet.has(char)) {
      kind = TokenKind.Special;
    } else {
      kind = TokenKind.Text;
    }
    if (currentToken !== undefined) {
      if (
        currentToken.kind !== kind ||
        kind === TokenKind.Special ||
        char === "\n"
      ) {
        tokens.push({
          kind: currentToken.kind,
          str: currentToken.chars.join(""),
        });
        currentToken = undefined;
      }
    }
    if (currentToken === undefined) {
      currentToken = {
        kind: kind,
        chars: [],
      };
    }
    currentToken.chars.push(char);
  }
  if (currentToken !== undefined) {
    tokens.push({
      kind: currentToken.kind,
      str: currentToken.chars.join(""),
    });
  }
  return tokens;
}
