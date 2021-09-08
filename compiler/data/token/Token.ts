export enum TokenKind {
  Whitespace = "whitespace",
  Special = "special",
  Text = "text",
  Invalid = "invalid",
}

export interface Token {
  kind: TokenKind;
  str: string;
}
