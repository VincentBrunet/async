import { AstModule } from "../101_ast/data/AstModule.ts";
import { OutputModule } from "./util/OutputModule.ts";
import { writeModule } from "./write/writeModule.ts";

export function convertAstToOutputModule(astModule: AstModule): OutputModule {
  const output = new OutputModule();
  writeModule(output, astModule);
  return output;
}
