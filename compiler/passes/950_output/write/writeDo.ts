import { AstDo } from "../../../data/ast/AstDo.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeClosure } from "./writeClosure.ts";

let _id = 0;

export function writeDo(
  module: OutputModule,
  statement: OutputStatement,
  astDo: AstDo,
) {
  // Asserts
  if (!astDo.closures) {
    throw new Error("Invalid closure setup");
  }

  // TODO - Do name mangling
  const name = "d_0x" + (_id++).toString(16);

  // Simply call the do function in the expression
  statement.pushPart("do_call_x(");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(astDo.closures.length.toString());
  for (const astClosure of astDo.closures) {
    statement.pushPart(", ");
    writeClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New scope
  const scope = new OutputScope(name);

  // Do the recursive writing
  if (astDo.block) {
    writeBlock(module, scope, astDo.block);
  }

  // Setup params
  scope.pushParam("t_ref **closure");

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
