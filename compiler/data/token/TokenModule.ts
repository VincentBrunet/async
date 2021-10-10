import { CodeModule } from "../code/CodeModule.ts";
import { Token } from "./Token.ts";

export interface TokenModule {
  metaUrl: URL;
  metaCode: CodeModule;

  tokens: Array<Token>;
}
