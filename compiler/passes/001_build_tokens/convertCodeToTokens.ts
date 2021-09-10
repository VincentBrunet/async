import { Token, TokenKind } from "../../data/token/Token.ts";

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
  indexBegin: number;
  columnBegin: number;
  lineBegin: number;
}

export function convertCodeToTokens(code: string): Array<Token> {
  const tokens = new Array<Token>();
  let index = 0;
  let column = 0;
  let line = 0;
  let currentToken: PartialToken | undefined = undefined;
  for (index = 0; index < code.length; index++) {
    const char = code.charAt(index);
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
          location: {
            indexBegin: currentToken.indexBegin,
            indexEnd: index,
            columnBegin: currentToken.columnBegin,
            columnEnd: column,
            lineBegin: currentToken.lineBegin,
            lineEnd: line,
          },
        });
        currentToken = undefined;
      }
    }
    if (currentToken === undefined) {
      currentToken = {
        kind: kind,
        chars: [],
        indexBegin: index,
        columnBegin: column,
        lineBegin: line,
      };
    }
    currentToken.chars.push(char);
    if (char === "\n") {
      line = line + 1;
      column = 0;
    }
    if (char === "\r") {
      column = 0;
    }
  }
  if (currentToken !== undefined) {
    tokens.push({
      kind: currentToken.kind,
      str: currentToken.chars.join(""),
      location: {
        indexBegin: currentToken.indexBegin,
        indexEnd: index - 1,
        columnBegin: currentToken.columnBegin,
        columnEnd: column,
        lineBegin: currentToken.lineBegin,
        lineEnd: line,
      },
    });
  }
  return tokens;
}
