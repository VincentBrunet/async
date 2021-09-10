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

function makeToken(
  partialToken: PartialToken,
  indexEnd: number,
  columnEnd: number,
  lineEnd: number,
) {
  return {
    kind: partialToken.kind,
    str: partialToken.chars.join(""),
    location: {
      index: {
        begin: partialToken.indexBegin,
        end: indexEnd,
      },
      column: {
        begin: partialToken.columnBegin,
        end: columnEnd,
      },
      line: {
        begin: partialToken.lineBegin,
        end: lineEnd,
      },
    },
  };
}

/**
 * Convert a code file into a token array
 */
export function convertCodeToTokens(code: string): Array<Token> {
  const tokens = new Array<Token>();

  // location counters
  let index = 0;
  let column = 0;
  let line = 0;

  // current token being parsed
  let partialToken: PartialToken | undefined = undefined;

  // loop over all characters of the code
  for (let i = 0; i < code.length; i++) {
    const char = code.charAt(i);

    // Find the kind of token this character belong to
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

    // If we were already parsing a token, we may consider closing it
    if (partialToken !== undefined) {
      if (
        partialToken.kind !== kind ||
        kind === TokenKind.Special
      ) {
        tokens.push(makeToken(partialToken, index, column, line));
        partialToken = undefined;
      }
    }

    // Increment location counters
    index = index + 1;
    column = column + 1;

    // If we don't have a token opened yet, open one
    if (partialToken === undefined) {
      partialToken = {
        kind: kind,
        chars: [],
        indexBegin: index,
        columnBegin: column,
        lineBegin: line,
      };
    }

    // Add the current character to the currently parsed token
    partialToken.chars.push(char);

    // If we just line-returned, update location counters
    if (char === "\n") {
      line = line + 1;
      column = 0;
    }
  }

  // If we still have an open token at the end of the parsing, close it
  if (partialToken !== undefined) {
    tokens.push(makeToken(partialToken, index, column, line));
  }

  // done
  return tokens;
}
