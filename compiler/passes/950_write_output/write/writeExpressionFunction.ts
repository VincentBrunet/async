import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeResolvedClosure } from "./writeResolvedClosure.ts";

export function writeExpressionFunction(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionFunction,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashAstKey(module, ast, "function");

  // Simply call the function factory
  const callLength = resolvedClosures.length.toString();
  const callVariadic = resolvedClosures.length > 9;
  statement.pushPart("function_make_");
  if (callVariadic) {
    statement.pushPart("x");
  } else {
    statement.pushPart(callLength);
  }
  statement.pushPart("(");
  statement.pushPart("type_function"); // TODO,
  statement.pushPart(", ");
  statement.pushPart("(void*)&");
  statement.pushPart(name);
  if (callVariadic) {
    statement.pushPart(", ");
    statement.pushPart(resolvedClosures.length.toString());
  }
  for (const astClosure of resolvedClosures) {
    statement.pushPart(", ");
    writeResolvedClosure(statement, astClosure);
  }
  statement.pushPart(")");

  // New function
  const child = new OutputScope("t_value *", name);

  // Setup params
  child.pushParam("t_ref **closure");
  for (const astParam of ast.params) {
    child.pushParam("t_value *__" + astParam.name);
  }

  // Push statements
  writeBlock(module, child, ast.block);

  // Backup return
  const done = new OutputStatement();
  done.pushPart("return null_make()");
  child.pushStatement(OutputOrder.After, done);

  // Done, push the newly created function
  module.pushScope(child);
}
