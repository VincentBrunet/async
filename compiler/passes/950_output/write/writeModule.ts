import { AstModule } from "../../101_ast/data/AstModule.ts";

import { OutputCode } from "../util/OutputCode.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(output: OutputCode, astModule: AstModule) {
  output.writeToHeader("void *getModule();");
  output.writeToSource("void *getModule() {");
  for (const statement of astModule.statements) {
    writeStatement(output, statement);
  }
  output.writeToSource("}");
}
