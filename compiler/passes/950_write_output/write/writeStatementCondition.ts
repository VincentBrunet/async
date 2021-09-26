import {
  AstStatementCondition,
  AstStatementConditionBranch,
} from "../../../data/ast/AstStatementCondition.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { OutputOrder } from "../util/OutputOrder.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputStatement } from "../util/OutputStatement.ts";
import { writeBlock } from "./writeBlock.ts";
import { writeExpression } from "./writeExpression.ts";

function writeStatementConditionBranch(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementConditionBranch,
) {
  // opening (expression)
  const opening = new OutputStatement();
  opening.pushPart("if (TO_BOOLEAN(");
  writeExpression(module, scope, opening, ast.condition);
  opening.pushPart(")) {");
  opening.markSpecial();
  scope.pushStatement(OutputOrder.Logic, opening);
  // content
  writeBlock(module, scope, ast.block);
  // closing
  const closing = new OutputStatement();
  closing.pushPart("}");
  closing.markSpecial();
  scope.pushStatement(OutputOrder.Logic, closing);
}

export function writeStatementCondition(
  module: OutputModule,
  scope: OutputScope,
  ast: AstStatementCondition,
) {
  for (const branch of ast.branches) {
    writeStatementConditionBranch(module, scope, branch);
  }
}
