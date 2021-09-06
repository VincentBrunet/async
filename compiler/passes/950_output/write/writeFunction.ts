import { AstFunction } from "../../../data/ast/AstFunction.ts";
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
  // TODO - function name mangling
  const name = "f_0x" + (_id++).toString(16);

  statement.pushPart("function_make_x(");
  statement.pushPart("type_function"); // TODO,
  statement.pushPart(", ");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart("0");
  statement.pushPart(")");

  const func = new OutputFunc(name);
  if (astFunction.block) {
    writeBlock(module, func, astFunction.block);
  }

  const variables = func.getVariables();
  variables.sort((a, b) => {
    return a.getHash() - b.getHash();
  });

  func.pushParam("t_closure *closure");

  for (const variable of variables) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_variable *");
    declaration.pushPart(variable.getName());
    declaration.pushPart(" = ");
    declaration.pushPart("variable_make(");
    declaration.pushPart(variable.getHash().toString());
    declaration.pushPart(")");
    func.pushStatement(OutputOrder.Variables, declaration);
  }

  const tt2 = new OutputStatement();
  tt2.pushPart("return value_null");
  func.pushStatement(OutputOrder.After, tt2);

  module.pushFunc(func);
}
