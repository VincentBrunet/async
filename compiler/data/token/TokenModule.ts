import { CodeModule } from "../code/CodeModule.ts";
import { Token } from "./Token.ts";

export interface TokenModule {
  meta: CodeModule;

  list: Array<Token>;
}
