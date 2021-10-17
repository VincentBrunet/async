import { OutputBlock } from "../../../data/output/OutputBlock.ts";
import { repeat } from "../../../lib/core/strings/repeat.ts";
import { Writer } from "../util/Writer.ts";
import { writeStatement } from "./writeStatement.ts";

export function writeBlock(
  writer: Writer,
  outputBlock: OutputBlock,
  depth: number,
) {
  writer.pushToSource("{");
  writer.pushToSource("\n");
  for (const outputStatement of outputBlock.statements) {
    writeStatement(writer, outputStatement, depth + 1);
  }
  writer.pushToSource(repeat("  ", depth));
  writer.pushToSource("}");
}
