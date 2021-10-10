import { AstExpressionRun } from "../../../data/ast/AstExpressionRun.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeResolvedClosure } from "./writeResolvedClosure.ts";

export function writeExpressionRun(
  module: OutputModule,
  scope: OutputScope,
  statement: OutputStatement,
  ast: AstExpressionRun,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashAstKey(module, ast, "run");

  // Simply call the run function in the expression
  const callLength = resolvedClosures.length.toString();
  const callVariadic = resolvedClosures.length > 9;
  statement.pushPart("run_call_");
  if (callVariadic) {
    statement.pushPart("x");
  } else {
    statement.pushPart(callLength);
  }
  statement.pushPart("(");
  statement.pushPart("&");
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

  // New scope
  const child = new OutputScope("t_value *", name);

  // Setup params
  child.pushParam("t_ref **closure");

  // Run the recursive writing
  writeBlock(module, child, ast.block);

  // Runne, push the newly created function
  module.pushScope(child);
}
