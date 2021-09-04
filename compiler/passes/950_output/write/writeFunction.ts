import { AstFunction } from "../../101_ast/data/AstFunction.ts";
import { OutputBlock, OutputBlockType } from "../util/OutputBlock.ts";
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

  statement.pushPart("value_factory_function(");
  statement.pushPart("type_function"); // TODO,
  statement.pushPart(", ");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart("0");
  statement.pushPart(")");

  const block = new OutputBlock(OutputBlockType.Function, name);

  const tt = new OutputStatement();
  tt.pushPart("t_object *this");
  block.pushStatement(tt);

  if (astFunction.block) {
    writeBlock(module, block, astFunction.block);
  }

  const tt2 = new OutputStatement();
  tt2.pushPart("return value_null;");
  block.pushStatement(tt2);

  block.process();
  module.pushBlock(block);
}
