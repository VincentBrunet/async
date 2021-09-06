import { AstFunction } from "../../101_ast/data/AstFunction.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
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

  const func = new OutputFunc(name);

  const tt = new OutputStatement();
  tt.pushPart("t_value *module");
  func.pushStatement(OutputOrder.Variables, tt);

  if (astFunction.block) {
    writeBlock(module, func, astFunction.block);
  }

  const tt2 = new OutputStatement();
  tt2.pushPart("return value_null");
  func.pushStatement(OutputOrder.After, tt2);

  module.pushFunc(func);
}
