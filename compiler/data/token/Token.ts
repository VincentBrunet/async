import { Range } from "../util/Range.ts";

export enum TokenKind {
  Whitespace = "whitespace",
  Special = "special",
  Text = "text",
  Invalid = "invalid",
}

export interface TokenLocation {
  index: Range;
  column: Range;
  line: Range;
}

export interface Token {
  kind: TokenKind;
  str: string;
  location: TokenLocation;
}
