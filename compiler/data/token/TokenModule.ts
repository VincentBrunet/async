import { Token } from "./Token.ts";

export interface TokenModule {
  hash: string;
  list: Array<Token>;
}
