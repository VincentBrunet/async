import { AstBlock } from "../../../data/ast/AstBlock.ts";
import { OutputScope } from "../util/OutputScope.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeBlock(
  module: OutputModule,
  scope: OutputScope,
  astBlock: AstBlock,
) {
  for (const statement of astBlock.statements) {
    writeStatement(module, scope, statement);
  }
}
