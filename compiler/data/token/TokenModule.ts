import { Token } from "./Token.ts";

export interface TokenModule {
  url: string;
  hash: string;
  list: Array<Token>;
}
