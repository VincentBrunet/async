import { AstModule } from "../../101_ast/data/AstModule.ts";

import { OutputCode } from "../util/OutputCode.ts";
import { OutputSection } from "../util/OutputSection.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(output: OutputCode, astModule: AstModule) {
  output.writeToHeader(OutputSection.Module, "void *getModule();");
  output.writeToSource(OutputSection.Module, "void *getModule() {");
  for (const statement of astModule.statements) {
    writeStatement(output, statement);
  }
  output.writeToSource(OutputSection.Module, "}");
}
