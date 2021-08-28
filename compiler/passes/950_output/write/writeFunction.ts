import { AstFunction } from "../../101_ast/data/AstFunction.ts";

import { OutputCode } from "../util/OutputCode.ts";
import { OutputSection } from "../util/OutputSection.ts";

export function writeFunction(output: OutputCode, astFunction: AstFunction) {
  output.writeToSource(OutputSection.Module, "malloc(10)");
}
