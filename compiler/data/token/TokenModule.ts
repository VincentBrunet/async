import { CodeModule } from "../code/CodeModule.ts";
import { Token } from "./Token.ts";

export interface TokenModule {
  metaCode: CodeModule;

  tokens: Array<Token>;
}
