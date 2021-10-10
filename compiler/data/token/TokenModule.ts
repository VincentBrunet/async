import { CodeModule } from "../code/CodeModule.ts";
import { Token } from "./Token.ts";

export interface TokenModule {
  sourceCode: CodeModule;

  tokens: Array<Token>;
}
