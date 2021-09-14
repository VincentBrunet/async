import { AstExpressionRun } from "../../../data/ast/expression/AstExpressionRun.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeClosure } from "./writeClosure.ts";

let _id = 0;

export function writeRun(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  astRun: AstExpressionRun,
) {
  // Asserts
  if (!astRun.closures) {
    throw new Error("Invalid closure setup");
  }

  // TODO - Run name mangling
  const name = "r_0x" + (_id++).toString(16);

  // Simply call the run function in the expression
  statement.pushPart("run_call_x(");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(astRun.closures.length.toString());
  for (const astClosure of astRun.closures) {
    statement.pushPart(", ");
    writeClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New scope
  const child = new OutputScope(name);

  // Run the recursive writing
  writeBlock(module, child, astRun.block);

  // Setup params
  child.pushParam("t_ref **closure");

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

  // Runne, push the newly created function
  module.pushScope(child);
}
