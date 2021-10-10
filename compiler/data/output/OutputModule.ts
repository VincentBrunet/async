import { AstModule } from "../ast/AstModule.ts";
import { OutputFunction } from "./OutputFunction.ts";
import { OutputInclude } from "./OutputInclude.ts";

export interface OutputModule {
  sourceAst: AstModule;

  includes: Array<OutputInclude>;
  functions: Array<OutputFunction>;
}
