import { AstFunction } from "../../101_ast/data/AstFunction.ts";

import { OutputCode } from "../util/OutputCode.ts";
import { OutputSection } from "../util/OutputSection.ts";

export function writeFunction(output: OutputCode, astFunction: AstFunction) {
  if (astFunction.name) {
    output.writeToSource(
      OutputSection.Module,
      "void *" + astFunction.name + ";",
    );
  }
  output.writeToSource(OutputSection.Module, "malloc(10)");
}
