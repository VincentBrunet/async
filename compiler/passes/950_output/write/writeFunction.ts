import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeClosure } from "./writeClosure.ts";
import { writeIdentifier } from "./writeIdentifier.ts";

let _id = 0;

export function writeFunction(
  module: OutputModule,
  statement: OutputStatement,
  astFunction: AstFunction,
) {
  if (!astFunction.closures) {
    throw new Error("Inavlid closure setup");
  }

  // TODO - function name mangling
  const name = "f_0x" + (_id++).toString(16);

  // Simply call the function factory
  statement.pushPart("function_make_x(");
  statement.pushPart("type_function"); // TODO,
  statement.pushPart(", ");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(astFunction.closures.length.toString());
  for (const astClosure of astFunction.closures) {
    statement.pushPart(", ");
    writeClosure(module, statement, astClosure);
  }
  statement.pushPart(")");

  // New function
  const func = new OutputFunc(name);

  // Setup params
  func.pushParam("t_closure *closure");
  for (const astParam of astFunction.params) {
    func.pushParam("t_value *__" + astParam.name);
  }

  // Push statements
  if (astFunction.block) {
    writeBlock(module, func, astFunction.block);
  }

  // Setup declarations
  const variables = func.readVariables();
  for (const variable of variables) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_variable *__");
    declaration.pushPart(variable.getName());
    declaration.pushPart(" = ");
    declaration.pushPart("variable_make(");
    declaration.pushPart(variable.getHash().toString());
    declaration.pushPart(", NULL)");
    func.pushStatement(OutputOrder.Variables, declaration);
  }

  // TODO - wut
  const tt2 = new OutputStatement();
  tt2.pushPart("return value_null");
  func.pushStatement(OutputOrder.After, tt2);

  module.pushFunc(func);
}
