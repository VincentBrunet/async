import { AstModule } from "../../101_ast/data/AstModule.ts";
import { OutputBlock, OutputBlockType } from "../util/OutputBlock.ts";
import { OutputModule } from "../util/OutputModule.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeModule(module: OutputModule, astModule: AstModule) {
  const block = new OutputBlock(OutputBlockType.Module, "module_load");
  for (const astStatement of astModule.statements) {
    writeStatement(module, block, astStatement);
  }
  block.process();
  module.pushBlock(block);
}
