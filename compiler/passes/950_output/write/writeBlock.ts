import { AstBlock } from "../../101_ast/data/AstBlock.ts";
import { OutputFunc } from "../util/OutputFunc.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeBlock(
  module: OutputModule,
  func: OutputFunc,
  astBlock: AstBlock,
) {
  for (const statement of astBlock.statements) {
    writeStatement(module, func, statement);
  }
}
