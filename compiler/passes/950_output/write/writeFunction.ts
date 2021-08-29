import { AstFunction } from "../../101_ast/data/AstFunction.ts";

import { OutputCode } from "../util/OutputCode.ts";

import { writeBlock } from "./writeBlock.ts";

let _id = 0;

export function writeFunction(output: OutputCode, astFunction: AstFunction) {
  const name = "f_0x" + (_id++).toString(16);

  output.addContent("(t_function)");
  output.addContent(name);

  output.pushFunction(name)
  if (astFunction.block) {
    writeBlock(output, astFunction.block);
  }
  output.popFunction()

}
