import { AstExpressionFunction } from "../../../data/ast/AstExpressionFunction.ts";
import { ensure } from "../../../lib/errors/ensure.ts";
import { hashAstKey } from "../../../lib/hash/hashAstKey.ts";
import { RecursorPass } from "../../util/RecursorPass.ts";
import { BrowsedScope } from "../util/BrowsedScope.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeResolvedClosure } from "./writeResolvedClosure.ts";

export function writeExpressionFunction(
  pass: RecursorPass<BrowsedScope>,
  scope: BrowsedScope,
  ast: AstExpressionFunction,
) {
  const resolvedClosures = ensure(ast.resolvedClosures);

  // Generate a stable unique name
  const name = hashAstKey(module.getMeta(), ast, "function");

  // Simply call the function factory
  const callLength = resolvedClosures.length.toString();
  const callVariadic = resolvedClosures.length > 9;
  scope.pushStatementPart("function_make_");
  if (callVariadic) {
    scope.pushStatementPart("x");
  } else {
    scope.pushStatementPart(callLength);
  }
  scope.pushStatementPart("(");
  scope.pushStatementPart("type_function"); // TODO,
  scope.pushStatementPart(", ");
  scope.pushStatementPart("(void*)&");
  scope.pushStatementPart(name);
  if (callVariadic) {
    scope.pushStatementPart(", ");
    scope.pushStatementPart(resolvedClosures.length.toString());
  }
  for (const astClosure of resolvedClosures) {
    scope.pushStatementPart(", ");
    writeResolvedClosure(statement, astClosure);
  }
  scope.pushStatementPart(")");

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
  child.pushStatement(done);

  // Done, push the newly created function
  module.pushScope(child);
}
