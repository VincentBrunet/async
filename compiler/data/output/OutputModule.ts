import { AstModule } from "../ast/AstModule.ts";
import { CodeModule } from "../code/CodeModule.ts";
import { TokenModule } from "../token/TokenModule.ts";
import { OutputFunction } from "./OutputFunction.ts";

export interface OutputModule {
  metaUrl: URL;
  metaCode: CodeModule;
  metaToken: TokenModule;
  metaAst: AstModule;

  functions: Array<OutputFunction>;
}
