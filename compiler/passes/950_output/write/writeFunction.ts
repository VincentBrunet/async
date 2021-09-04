import { AstFunction } from "../../101_ast/data/AstFunction.ts";
import { OutputBlock } from "../util/OutputBlock.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";

let _id = 0;

export function writeFunction(
  module: OutputModule,
  statement: OutputStatement,
  astFunction: AstFunction,
) {
  const name = "f_0x" + (_id++).toString(16);

  statement.pushPart("(t_function)(");
  statement.pushPart(name);
  statement.pushPart(")");

  const block = new OutputBlock(name);
  if (astFunction.block) {
    writeBlock(module, block, astFunction.block);
  }
  module.pushBlock(block);
}
