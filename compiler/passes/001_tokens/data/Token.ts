import { TokenType } from "./TokenType.ts";

export interface Token {
  type: TokenType;
  str: string;
}
