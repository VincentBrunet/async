import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeResolvedClosure } from "./writeResolvedClosure.ts";

let _id = 0;

export function writeExpressionRun(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionRun,
) {
  // Asserts
  if (!ast.resolvedClosures) {
    throw new Error("Invalid closure setup");
  }
  if (!ast.resolvedVariables) {
    throw new Error("Unresolved Variables");
  }

  // TODO - Run name mangling
  const name = "r_0x" + (_id++).toString(16);

  // Simply call the run function in the expression
  statement.pushPart("run_call_x(");
  statement.pushPart("&");
  statement.pushPart(name);
  statement.pushPart(", ");
  statement.pushPart(ast.resolvedClosures.length.toString());
  for (const astClosure of ast.resolvedClosures) {
    statement.pushPart(", ");
    writeResolvedClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New scope
  const child = new OutputScope(name);

  // Run the recursive writing
  writeBlock(module, child, ast.block);

  // Setup params
  child.pushParam("t_ref **closure");

  // Setup declarations
  const variables = ast.resolvedVariables;
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
  final.pushPart("return null_make()");
  child.pushStatement(OutputOrder.After, final);

  // Runne, push the newly created function
  module.pushScope(child);
}
