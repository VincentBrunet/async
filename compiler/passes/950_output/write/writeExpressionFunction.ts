import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { writeResolvedClosure } from "../resolved/writeResolvedClosure.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";

let _id = 0;

export function writeExpressionFunction(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astFunction: AstExpressionFunction,
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
    writeResolvedClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New function
  const child = new OutputScope(name);

  // Push statements
  writeBlock(module, child, astFunction.block);

  // Setup params
  child.pushParam("t_ref **closure");
  for (const astParam of astFunction.params) {
    child.pushParam("t_value *__" + astParam.name);
  }

  // Setup declarations
  const variables = child.readVariables();
  for (const variable of variables) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_ref *__");
    declaration.pushPart(variable.name);
    declaration.pushPart(" = ");
    declaration.pushPart("ref_make(NULL)");
    child.pushStatement(OutputOrder.Variables, declaration);
  }

  // Add a return statement - TODO (this should be added by user)
  const final = new OutputStatement();
  final.pushPart("return value_null");
  child.pushStatement(OutputOrder.After, final);

  // Done, push the newly created function
  module.pushScope(child);
}
