import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeResolvedClosure } from "./writeResolvedClosure.ts";

let _id = 0;

export function writeExpressionFunction(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionFunction,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);
  const resolvedVariables = ensure(ast.resolvedVariables);

  // TODO - function name mangling
  const name = "f_0x" + (_id++).toString(16);

  // Simply call the function factory
  statement.pushPart("function_make_x(");
  statement.pushPart("type_function"); // TODO,
  statement.pushPart(", ");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(resolvedClosures.length.toString());
  for (const astClosure of resolvedClosures) {
    statement.pushPart(", ");
    writeResolvedClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New function
  const child = new OutputScope(name);

  // Push statements
  writeBlock(module, child, ast.block);

  // Setup params
  child.pushParam("t_ref **closure");
  for (const astParam of ast.params) {
    child.pushParam("t_value *__" + astParam.name);
  }

  // Setup declarations
  for (const variable of resolvedVariables) {
    const declaration = new OutputStatement();
    declaration.pushPart("t_ref *");
    declaration.pushPart("__");
    declaration.pushPart(variable.name);
    declaration.pushPart(" = ");
    declaration.pushPart("ref_make(NULL)");
    child.pushStatement(OutputOrder.Variables, declaration);
  }

  // Add a return statement - TODO (this should be added by user)
  const final = new OutputStatement();
  final.pushPart("return null_make()");
  child.pushStatement(OutputOrder.After, final);

  // Done, push the newly created function
  module.pushScope(child);
}
