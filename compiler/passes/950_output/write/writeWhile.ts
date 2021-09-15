import { AstWhile } from "../../../data/ast/AstWhile.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeExpression } from "./expression/writeExpression.ts";
import { writeBlock } from "./writeBlock.ts";

export function writeWhile(
  module: OutputModule,
  scope: OutputScope,
  astWhile: AstWhile,
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
