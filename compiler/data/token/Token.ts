export enum TokenKind {
  Whitespace = "whitespace",
  Special = "special",
  Text = "text",
  Invalid = "invalid",
}

export interface TokenRange {
  begin: number;
  end: number;
}

export interface TokenLocation {
  index: TokenRange;
  column: TokenRange;
  line: TokenRange;
}

export interface Token {
  kind: TokenKind;
  str: string;
  location: TokenLocation;
}
