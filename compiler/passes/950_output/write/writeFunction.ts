import { AstFunction } from "../../101_ast/data/AstFunction.ts";

import { OutputCode } from "../util/OutputCode.ts";

export function writeFunction(output: OutputCode, astFunction: AstFunction) {
  if (astFunction.name) {
    output.writeToSource("void *" + astFunction.name + ";");
  }
  output.writeToSource("malloc(10)");
}
