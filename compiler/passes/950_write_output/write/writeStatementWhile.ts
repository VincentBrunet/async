import { AstStatementWhile } from "../../../data/ast/AstStatementWhile.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeExpression } from "./writeExpression.ts";

export function writeStatementWhile(
  module: OutputModule,
  scope: OutputScope,
  astWhile: AstStatementWhile,
) {
  // opening (expression)
  const opening = new OutputStatement();
  opening.pushPart("while (TO_BOOLEAN(");
  writeExpression(module, scope, opening, astWhile.condition);
  opening.pushPart(")) {");
  opening.markSpecial();
  scope.pushStatement(OutputOrder.Logic, opening);
  // content
  writeBlock(module, scope, astWhile.block);
  // closing
  const closing = new OutputStatement();
  closing.pushPart("}");
  closing.markSpecial();
  scope.pushStatement(OutputOrder.Logic, closing);
}
