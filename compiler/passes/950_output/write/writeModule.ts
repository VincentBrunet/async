import { AstModule } from "../../101_ast/data/AstModule.ts";
import { OutputBlock } from "../util/OutputBlock.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, astModule: AstModule) {
  const block = new OutputBlock("module_load");
  for (const astStatement of astModule.statements) {
    writeStatement(module, block, astStatement);
  }
  module.pushBlock(block);
}
