export enum TokenKind {
  Whitespace = "whitespace",
  Special = "special",
  Text = "text",
  Invalid = "invalid",
}

export interface TokenLocation {
  indexBegin: number;
  indexEnd: number;
  columnBegin: number;
  columnEnd: number;
  lineBegin: number;
  lineEnd: number;
}

export interface Token {
  kind: TokenKind;
  str: string;
  location: TokenLocation;
}
