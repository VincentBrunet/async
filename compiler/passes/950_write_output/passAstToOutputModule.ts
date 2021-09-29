import { AstModule } from "../../data/ast/AstModule.ts";
import { OutputModule } from "./util/OutputModule.ts";
import { writeModule } from "./write/writeModule.ts";

export async function passAstToOutputModule(
  astModule: AstModule,
) {
  const output = new OutputModule();
  writeModule(output, astModule);
  return output;
}
