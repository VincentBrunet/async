import { TokenKind } from "./TokenKind.ts";

export interface Token {
  kind: TokenKind;
  str: string;
}
