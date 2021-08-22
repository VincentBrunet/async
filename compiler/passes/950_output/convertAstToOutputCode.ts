import { AstModule } from "../101_ast/data/AstModule.ts";
import { OutputCode } from "./util/OutputCode.ts";
import { writeModule } from "./write/writeModule.ts";

export function convertAstToOutputCode(astModule: AstModule) {
  const output = new OutputCode();
  writeModule(output, astModule);
  return output;
}
