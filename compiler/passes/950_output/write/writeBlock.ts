import { AstBlock } from "../../101_ast/data/AstBlock.ts";
import { OutputBlock } from "../util/OutputBlock.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeBlock(
  module: OutputModule,
  block: OutputBlock,
  astBlock: AstBlock,
) {
  for (const statement of astBlock.statements) {
    writeStatement(module, block, statement);
  }
}
