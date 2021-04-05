import { Token } from "../../data/Token.ts";
import { TokenType } from "../../data/TokenType.ts";

const invalidArray = ["\a", "\v", "\b", "\f",];
const whitespaceArray = [" ", "\t", "\n", "\r", "\0"];
const specialArray = [
  "-",
  "+",
  "!",
  "=",
  "?",
  ",",
  ";",
  ".",
  ":",
  "%",
  "*",
  "|",
  "&",
  "/",
  "\\",
  "@",
  "~",
  "#",
  "^",
  "'",
  '"',
  "<",
  ">",
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
];

const invalidSet = new Set(invalidArray);
const whitespaceSet = new Set(whitespaceArray);
const specialSet = new Set(specialArray);

interface PartialToken {
  type: TokenType;
  chars: string[];
}

export function convertCodeToTokens(code: string): Token[] {
  const tokens: Token[] = [];
  let currentToken: PartialToken | undefined = undefined;
  for (let idx = 0; idx < code.length; idx++) {
    const char = code.charAt(idx);
    let type;
    if (invalidSet.has(char)) {
      type = TokenType.Invalid;
    } else if (whitespaceSet.has(char)) {
      type = TokenType.Whitespace;
    } else if (specialSet.has(char)) {
      type = TokenType.Symbol;
    } else {
      type = TokenType.Identifier;
    }
    if (currentToken !== undefined) {
      if (currentToken.type !== type || type === TokenType.Symbol) {
        tokens.push({
          type: currentToken.type,
          str: currentToken.chars.join(""),
        });
        currentToken = undefined;
      }
    }
    if (currentToken === undefined) {
      currentToken = {
        type: type,
        chars: [],
      };
    }
    currentToken.chars.push(char);
  }
  if (currentToken !== undefined) {
    tokens.push({
      type: currentToken.type,
      str: currentToken.chars.join(""),
    });
  }
  return tokens;
}
