import { AstFunction } from "../../../data/ast/AstFunction.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeClosure } from "./writeClosure.ts";

let _id = 0;

export function writeFunction(
  module: OutputModule,
  statement: OutputStatement,
  astFunction: AstFunction,
) {
  // Asserts
  if (!astFunction.closures) {
    throw new Error("Invalid closure setup");
  }

  // TODO - function name mangling
  const name = "f_0x" + (_id++).toString(16);

  // Simply call the function factory
  statement.pushPart("function_make_x(");
  statement.pushPart("type_function"); // TODO,
  statement.pushPart(", ");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(astFunction.closures.length.toString());
  for (const astClosure of astFunction.closures) {
    statement.pushPart(", ");
    writeClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New function
  const scope = new OutputScope(name);

  // Push statements
  if (astFunction.block) {
    writeBlock(module, scope, astFunction.block);
  }

  // Setup params
  scope.pushParam("t_ref **closure");
  for (const astParam of astFunction.params) {
    scope.pushParam("t_value *__" + astParam.name);
  }

  // Setup declarations
  const variables = scope.readVariables();
  for (const variable of variables) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_ref *__");
    declaration.pushPart(variable.name);
    declaration.pushPart(" = ");
    declaration.pushPart("ref_make(NULL)");
    scope.pushStatement(OutputOrder.Variables, declaration);
  }

  // Add a return statement - TODO (this should be added by user)
  const final = new OutputStatement();
  final.pushPart("return value_null");
  scope.pushStatement(OutputOrder.After, final);

  // Done, push the newly created function
  module.pushScope(scope);
}
